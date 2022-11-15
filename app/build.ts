import fs from 'fs-extra';
import { Logger } from 'tslog';
import childProcess from 'child_process';

const log: Logger = new Logger();

(async () => {
  try {
    await remove('./dist/');
    log.info('start tsc build');
    await exec('tsc --build tsconfig.prod.json', './');
    await exec('tsc-alias -p tsconfig.prod.json', './');
    await copy('./build', './dist/build');
    log.info('start pkg build');
    await exec('pkg package.json', '');
  } catch (err) {
    log.error(err);
  }
})();

function remove(loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.remove(loc, (err) => {
      return !!err ? rej(err) : res();
    });
  });
}

function copy(src: string, dest: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.copy(src, dest, (err) => {
      return !!err ? rej(err) : res();
    });
  });
}

function exec(cmd: string, loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
      log.info(stdout);
      if (!!stderr) {
        log.warn(stderr);
      }
      return !!err ? rej(err) : res();
    });
  });
}
