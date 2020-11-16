/* eslint-disable class-methods-use-this */
const path = require('path');
const mv = require('mv');
const data = require('../src/data-maintpages')

class BuildAliasesPlugin {
  constructor(environment) {
    this.environment = environment
  }

  apply(compiler) {

    // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
    compiler.hooks.emit.tapAsync('BuildAliasesPlugin', (compilation, callback) => {

      const content = data.aliases[this.environment]
      const jsonObj = {}

      content.secondary.forEach(domain => {
        jsonObj[domain] = content.primary
      });

      console.log("building aliases.json for ",this.environment)

      // Insert this list into the webpack build as a new file asset:
      compilation.assets['aliases.json'] = {
        source() {
          return JSON.stringify(jsonObj)
        },
        size() {
          return JSON.stringify(jsonObj).length;
        }
      };

      callback();
    });


    compiler.hooks.afterEmit.tapAsync('BuildAliasesPlugin', (compilation, callback) => {
      const asset = compilation.getAsset('aliases.json')
      const src = asset.source.existsAt
      const dest = path.resolve(__dirname, `../preview/maintenance/${this.environment}/aliases.json`)

      // todo: non-critical move error
      console.log("moving files:")
      console.error("from", src)
      console.error("to", dest)

      mv(src, dest, (err) => {
        console.error("Moving failed due to async behavior, trying again. Error:", err)
        console.error("from", src)
        console.error("to", dest)

      })
      callback()
    })

  }


}

module.exports = BuildAliasesPlugin;
