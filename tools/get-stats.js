const path = require('path');

module.exports = () => {
  return {
    colors: true,
    reasons: true,
    children: false,
    context: path.resolve(__dirname, '../../'),
    assetsSort: '!size',
    depth: true,
    env: true,
    chunks: false,
    modules: false,
    chunkGroups: false,
    chunkModules: true,
    chunkOrigins: false,
    providedExports: true,
    source: true,
    usedExports: true,
    outputPath: true,
  }
}
