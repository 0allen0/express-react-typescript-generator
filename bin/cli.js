#!/usr/bin/env node

const generate = require('./generate');

console.log('Create new Express/React/TypeScript project...');

const args = process.argv.slice(2);

let name = 'express-react-typescript';

if (args.length > 0) {
  name = args[0];
}

let yarn = false;
if (args.includes('--yarn')) {
  yarn = true;
}

generate(name, yarn).then(() => {
  console.log('Create new project successfully!');
});
