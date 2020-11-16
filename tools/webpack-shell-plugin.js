/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */

const exec = require('child_process').exec;

function puts(error, stdout) {
    console.log(stdout);
}

function WebpackShellPlugin(options) {
  const defaultOptions = {
    onBuildStart: [],
    onBuildEnd: []
  };

  this.options = Object.assign(defaultOptions, options);
}

WebpackShellPlugin.prototype.apply = function(compiler) {
  const options = this.options;

  compiler.plugin("compilation", () => {
    if(options.onBuildStart.length){
        console.log("Executing pre-build scripts");
        options.onBuildStart.forEach(script => exec(script, puts));
    }
  });

  compiler.plugin("emit", (compilation, callback) => {
    if(options.onBuildEnd.length){
        console.log("Executing post-build scripts");
        options.onBuildEnd.forEach(script => exec(script, puts));
    }
    callback();
  });
};

module.exports = WebpackShellPlugin;
