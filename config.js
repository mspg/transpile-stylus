const path = require('path')
const CSS = require('./src')

module.exports = {
  TRANSPILERS: {
    CSS,
  },
  // files get loaded from example/src and example/includes
  CWD: path.join(__dirname, 'example'),
  // and published in example/publish
  OUT_DIR: path.join(__dirname, 'example', 'public'),
}
