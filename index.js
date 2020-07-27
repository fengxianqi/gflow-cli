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

program
.version(version)
.option('-h --help', 'help');

program.command('test <name>').action(async (name) => {
  const res = await git.status();
  console.log(res.isClean());
  console.log('\n Please input branch name!\n');

})

program.command('feature <action> <name>').action(async (action, name) => {
  try {

    // TODO: 判断参数

    const isClean = await isStatusClean();
    if(!isClean) {
      console.log('\n Please input branch name!\n');
      return;
    }

    if (action === 'start') {
      // feature start
      await git.checkout('develop');
      await git.pull();
      await git.checkout(['-B', `${FEATURE}/${name}`]);
      // await git.raw(`git branch --set-upstream-to=origin/${FEATURE}/${name} ${FEATURE}/${name}`);
      await git.push(['-u', `origin`, `${FEATURE}/${name}`]);
    } else if (action === 'finish') {
      featureFinish();
    } else if (action === 'publish') {
      featureFinish();
      await git.push();
    }
  } catch(ex) {
    console.log(ex)
  }
});


async function featureFinish(featureName){
  await git.checkout('develop');
  await git.pull();
  const res = await git.merge([featureName]);
  console.log('feture finish res: ', res);
}

async function isStatusClean(){
  const status = await git.status();
  const isClean = status.isClean()
  return isClean;
}


program.parse(process.argv)
