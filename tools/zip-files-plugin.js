/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const moment = require('moment')

const currentDate = moment().locale('en-gb').format('lll').replace(/[^a-z0-9]/gi, '_').toLowerCase()

class ZipFilesPlugin {

  constructor(environment) {
    this.environment = environment
  }

  apply(compiler) {

    // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
    compiler.hooks.done.tapAsync('ZipFilesPlugin', (compilation, callback) => {

      const distPath = path.resolve(__dirname, `../dist`)

      // allow deletion of dist at any time
      if (!fs.existsSync(distPath)) { fs.mkdirSync(distPath) }


      const output = fs.createWriteStream(path.resolve(__dirname, `../dist/maintpages_${this.environment}_generated_${currentDate}.zip`));
      const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      });

      output.on('close', function () {
        console.log(`${archive.pointer()} total bytes`);
        console.log('archiver has been finalized and the output file descriptor has closed.');
      });

      archive.directory(path.resolve(__dirname, `../preview/maintenance/${this.environment}`), false);

      output.on('end', function () {
        console.log('Data has been drained');
      });

      archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
          console.error(err)
        } else {
          throw err;
        }
      });

      archive.on('error', function (err) {
        throw err;
      });

      // pipe archive data to the file
      archive.pipe(output);

      archive.finalize();
      callback();
    });

  }
}

module.exports = ZipFilesPlugin;
