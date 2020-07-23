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

program.command('test <name>').action((name) => {
  // git.raw('')
})

program.command('feature <action> <name>').action(async (action, name) => {
  try {
    if (action === 'start') {
      // feature start
      await git.checkout('develop');
      await git.pull();
      await git.checkout(['-B', `${FEATURE}/${name}`]);
      // await git.raw(`git branch --set-upstream-to=origin/${FEATURE}/${name} ${FEATURE}/${name}`);
      await git.push(['-u', `origin`, `${FEATURE}/${name}`]);
    } else if (action === 'finish') {
  
    } else if (action === 'publish') {
  
    }
  } catch(ex) {
    console.log(ex)
  }
})

program.parse(process.argv)
