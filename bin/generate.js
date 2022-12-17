const path = require('path');
const childProcess = require('child_process');
const ncp = require('ncp').ncp;
const fs = require('fs');

const ncpOpts = {
  filter: (fileName) => {
    return !(fileName === 'package-lock.json' || fileName === 'node_modules');
  }
};

async function generate(destination, useYarn) {
  try {
    await fs.mkdirSync(destination);
    await copyFiles('../web', destination + '/web');
    await copyFiles('../app', destination + '/app');
    await copyFiles('../.dockerignore', destination + '/.dockerignore');
    await copyFiles('../doc/.gitignore_gen', destination + '/.gitignore');
    await copyFiles('../Dockerfile', destination + '/Dockerfile');
    await copyFiles('../doc/README_GEN.md', destination + '/README.md');
    downloadNodeModules(destination + '/web', useYarn);
    downloadNodeModules(destination + '/app', useYarn);
  } catch (err) {
    console.error(err);
  }
}

function copyFiles(sourceFolder, destination) {
  const source = path.join(__dirname, sourceFolder);
  return new Promise((res, rej) => {
    ncp.limit = 16;
    return ncp(source, destination, ncpOpts, (err) => {
      return !!err ? rej(err) : res();
    });
  });
}

function downloadNodeModules(destination, useYarn) {
  const options = { cwd: destination };
  let downloadLibCmd;
  if (useYarn) {
    downloadLibCmd = 'yarn';
  } else {
    downloadLibCmd = 'npm i';
  }
  childProcess.execSync(downloadLibCmd, options);
}

module.exports = generate;
