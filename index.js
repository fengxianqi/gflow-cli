#!usr/bin/env node

const { program } = require('commander');

const pkg = require('./package.json');

const { version } = pkg

program.version(version);