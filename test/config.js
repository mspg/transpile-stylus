const { is } = require('@magic/test')
const conf = require('../config')

module.exports = [
  { fn: () => conf.TRANSPILERS.CSS, expect: is.fn, info: 'css transpile is a function' },
]
