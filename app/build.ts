import fs from 'fs-extra';
import { Logger } from 'tslog';
import childProcess from 'child_process';

const log: Logger = new Logger();

(async () => {
  try {
    // Remove current build
    await remove('./dist/');
    // Copy front-end files
    await copy('./src/views', './dist/views');
    // Copy back-end files
    await exec('tsc --build tsconfig.prod.json', './');
  } catch (err) {
    log.error(err);
  }
})();

/**
 * Remove file
 */
function remove(loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.remove(loc, (err) => {
      return !!err ? rej(err) : res();
    });
  });
}

/**
 * Copy file.
 */
function copy(src: string, dest: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.copy(src, dest, (err) => {
      return !!err ? rej(err) : res();
    });
  });
}

/**
 * Do command line command.
 */
function exec(cmd: string, loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
      if (!!stdout) {
        log.info(stdout);
      }
      if (!!stderr) {
        log.warn(stderr);
      }
      return !!err ? rej(err) : res();
    });
  });
}
