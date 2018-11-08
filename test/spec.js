const path = require('path')

const { is, tryCatch } = require('@magic/test')

const STYLUS = require('../src/index.js')

const buffer = `
.content
  #id
    .class
      p
        color $color
`

const expect = `.content #id .class p{color:#008000;}\n/*# sourceMappingURL=stylus.css.map */`

const config = {
  CSS_DIR: path.join(__dirname, 'includes'),
  ENV: 'development',
}

module.exports = [
  { fn: () => STYLUS, expect: is.fn, info: 'STYLUS is a function' },
  {
    fn: async () => await STYLUS({ buffer, config }),
    expect,
    info: 'can render css in development and imports /variables.styl',
  },
  {
    fn: tryCatch(STYLUS, { config }),
    expect: is.error,
    info: 'Calling STYLUS without a buffer errors',
  },
  {
    fn: tryCatch(STYLUS),
    expect: is.error,
    info: 'Calling STYLUS without config errors',
  },
]
