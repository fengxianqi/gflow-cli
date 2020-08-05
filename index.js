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
.option('-h --help', 'help');



program.command('test <name>').action(async (name) => {
  const res = await git.status();
  console.log(res.isClean());
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
program.command('release <action> <name>').action(async (branch, action, name) => {
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
      deployProd(RELEASE, name);
    } else if (action === 'publish') {
      deployProd(RELEASE,name);
      await git.push('origin', 'master');
      await git.push('origin', 'develop');
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
      deployProd(HOTFIX, name);
    } else if (action === 'publish') {
      deployProd(HOTFIX, name);
      await git.push('origin', 'master');
      await git.push('origin', 'develop');
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
  await git.merge([`${branch}/${name}`]);
  // await git.push();
  console.log(`master merged ${branch}$/${name}!`);
  // 打tag
  await git.tag([name]);
  console.log(`added tag ${name}!`);

  await git.checkout('develop');
  await git.pull();
  await git.merge(['master']);
  // await git.push();
  console.log(`develop merged ${branch}$/${name}!`);
}

async function deleteRemoteBranch(name){
  await git.push(['origin', `:${name}`]);
  console.log(`The remote branch ${name} has been deleted!`)
}

program.parse(process.argv)

