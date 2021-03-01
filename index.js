#!/usr/bin/env node

const { program } = require('commander');
const simpleGit = require('simple-git/promise');
const git = simpleGit();

const pkg = require('./package.json');

const { version } = pkg


const FEATURE = 'feature'
const RELEASE = 'release'
const HOTFIX = 'hotfix'
const BUGFIX = 'bugfix'

const actions = ['start', 'finish', 'publish']

// help options
program
.version(version)
.option('-t --tag <tag>', 'add a tag base master')
.option('--no-tag', 'not add a tag when release finish/publish.')
.option('-h --help', 'help');


// test
program.command('test <name>').action(async (name) => {
  const res = await git.status();
  console.log(res.isClean());
  console.log(program.tag)
  console.log('\n Please input branch name!\n');
});

// feature
program.command('feature <action> <name>').action(async (action, name) => {
  try {

    // TODO: 判断参数
    if (!validateArgvs(action)) {
      return;
    }

    const isClean = await isStatusClean();
    if(action !== 'start' && !isClean) {
      console.log('\n Please commit your changes then try again!\n');
      return;
    }

    if (action === 'start') {
      // feature start
      checkoutNewBranch(`${FEATURE}/${name}`);
    } else if (action === 'finish') {
      featureFinish(`${FEATURE}/${name}`);
    } else if (action === 'publish') {
      featureFinish(`${FEATURE}/${name}`);
      await git.push();
      deleteRemoteBranch(`${FEATURE}/${name}`);
    }
  } catch(ex) {
    console.log(ex)
  }
});

// release
program.command('release <action> <name>').action(async (action, name) => {
  try {
    // // TODO: 判断参数
    // if (!actions.includes(action)) {
    //   console.log('\n Please enter a correct action name!\n');
    //   return;
    // }
    if (!validateArgvs(action)) {
      return;
    }


    const isClean = await isStatusClean();
    if(!isClean) {
      console.log('\n Please commit your changes then try again!\n');
      return;
    }

    if (action === 'start') {
      checkoutNewBranch(`${RELEASE}/${name}`);
    } else if (action === 'finish') {
      await deployProd(RELEASE, name);
      // 默认会打tag
      await addTag(name);
    } else if (action === 'publish') {
      await deployProd(RELEASE,name);
      await git.push('origin', 'master');
      await git.push('origin', 'develop');
      // 默认会打tag
      await addTag(name);
      await git.pushTags();
      deleteRemoteBranch(`${RELEASE}/${name}`);
    }
  } catch(ex) {
    console.log(ex)
  }
});

// hotfix
program.command('hotfix <action> <name>').action(async (action, name) => {
  try {

    // TODO: 判断参数
    if (!validateArgvs(action)) {
      return;
    }

    const isClean = await isStatusClean();
    // 新开分支时不报错
    if(action !== 'start' && !isClean) {
      console.log('\n Please commit your changes then try again!\n');
      return;
    }

    if (action === 'start') {
      checkoutNewBranch(`${HOTFIX}/${name}`, 'master');
    } else if (action === 'finish') {
      await deployProd(HOTFIX, name);
      // 默认会打tag
      await addTag(name);
    } else if (action === 'publish') {
      await deployProd(HOTFIX, name);
      await git.push('origin', 'master');
      await git.push('origin', 'develop');
      // 默认会打tag
      await addTag(name);
      await git.pushTags();
      deleteRemoteBranch(`${HOTFIX}/${name}`);
    }
  } catch(ex) {
    console.log(ex)
  }
});

// bugfix
program.command('bugfix <action> <name>').action(async (action, name) => {
  try {

    // TODO: 判断参数
    if (!validateArgvs(action)) {
      return;
    }

    const isClean = await isStatusClean();
    if(action !== 'start' && !isClean) {
      console.log('\n Please commit your changes then try again!\n');
      return;
    }

    if (action === 'start') {
      // feature start
      checkoutNewBranch(`${BUGFIX}/${name}`);
    } else if (action === 'finish') {
      featureFinish(`${BUGFIX}/${name}`);
    } else if (action === 'publish') {
      featureFinish(`${BUGFIX}/${name}`);
      await git.push();
      deleteRemoteBranch(`${BUGFIX}/${name}`);
    }
  } catch(ex) {
    console.log(ex)
  }
});


function validateArgvs (action) {
  if (!actions.includes(action)) {
    console.log('\n Please enter a correct action name! \n');
    return false;
  }
  return true;
}


async function checkoutNewBranch(targetName, base = 'develop'){
  await git.checkout(base);
  await git.pull();
  await git.checkout(['-B', targetName]);
  await git.push(['-u', `origin`, targetName]);
  console.log(`Checkout to ${targetName} base ${base}`);
}

async function featureFinish(featureName){
  await git.checkout('develop');
  await git.pull();
  const mergeSummary = await git.merge([featureName]);
  if (mergeSummary.failed) {
    console.error(`Merge resulted in ${ mergeSummary.conflicts.length } conflicts`);
    return;
  }
  console.log(`develop merged ${featureName}!`);
}

async function isStatusClean(){
  const status = await git.status();
  const isClean = status.isClean()
  return isClean;
}

async function deployProd(branch , name){
  await git.checkout('master');
  await git.pull();
  const mergeSummary = await git.merge([`${branch}/${name}`]);
  if (mergeSummary.failed) {
    console.error(`Merge resulted in ${ mergeSummary.conflicts.length } conflicts`);
    return;
  }
  // await git.push();
  console.log(`master merged ${branch}/${name}!`);

  await git.checkout('develop');
  await git.pull();
  const mergeSummary2 = await git.merge([`${branch}/${name}`]);
  if (mergeSummary2.failed) {
    console.error(`Merge resulted in ${ mergeSummary2.conflicts.length } conflicts`);
    return;
  }
  
  // await git.push();
  console.log(`develop merged ${branch}/${name}!`);
}

async function deleteRemoteBranch(name){
  await git.push(['origin', `:${name}`]);
  console.log(`The remote branch ${name} has been deleted!`)
}

async function addTag(name){
  // 如果传了: --no-tag，则不打tag
  if (program.tag === false) {
    return;
  } 
  let tagName = name;
  // 如果有-t参数名称，tagName取传进来的值
  if(program.tag) {
    tagName = program.tag
  }
  
  // 打tag
  await git.tag([tagName, 'master', '-f']);
  console.log(`added tag ${tagName} base master!`);
}

program.parse(process.argv)

