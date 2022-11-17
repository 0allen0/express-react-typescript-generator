#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');
const childProcess = require('child_process');

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

generate().then(() => {
  console.log('Create new project successfully!');
});

async function generate() {
  try {
    console.log('Copy project files...');
    await copy('../web', name + '/web');
    await copy('../app', name + '/app');
    await copy('../.dockerignore', name + '/.dockerignore');
    await copy('../.gitignore', name + '/.gitignore');
    await copy('../Dockerfile', name + '/Dockerfile');
    await copy('../doc/README_GEN.md', name + '/README.md');
    console.log('Install package files ...');
    if (yarn) {
      console.log('Start yarn install web package resources ...');
      childProcess.execSync('yarn', { cwd: name + '/web' });
      console.log('Start yarn install app package resources ...');
      childProcess.execSync('yarn', { cwd: name + '/app' });
    } else {
      console.log('Start npm install web package resources ...');
      childProcess.execSync('npm install', { cwd: name + '/web' });
      console.log('Start npm install app package resources ...');
      childProcess.execSync('npm install', { cwd: name + '/app' });
    }
  } catch (err) {
    console.error(err);
  }
}

function copy(src, dest) {
  const source = path.join(__dirname, src);
  return new Promise((res, rej) => {
    return fs.copy(
      source,
      dest,
      {
        filter: (path) => {
          return !(path.includes('node_modules') || path.includes('yarn.lock'));
        }
      },
      (err) => {
        return !!err ? rej(err) : res();
      }
    );
  });
}