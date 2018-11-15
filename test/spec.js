const path = require('path')

const { is, tryCatch } = require('@magic/test')

const STYLUS = require('../src/index.js')

const cssString = `
.content
  #id
    .class
      p
        color $color
`

const cssBuffer = Buffer.from(cssString, 'utf8')

const expect = `.content #id .class p{color:#008000;}\n/*# sourceMappingURL=stylus.css.map */`

const config = {
  CSS_DIR: path.join(__dirname, 'includes'),
  ENV: 'development',
}

module.exports = [
  { fn: () => STYLUS, expect: is.fn, info: 'STYLUS is a function' },
  {
    fn: async () => await STYLUS({ buffer: cssString, config }),
    expect,
    info: 'can render css in development and imports /variables.styl',
  },
  {
    fn: async () => await STYLUS({ buffer: cssBuffer, config }),
    expect,
    info: 'can render css in development and imports /variables.styl',
  },
  {
    fn: async () => await STYLUS({ buffer: cssBuffer, config }),
    expect: async () => await STYLUS({ buffer: cssString, config }),
    info: 'string and buffer inputs render to the same css string',
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
  {
    fn: tryCatch(STYLUS, { config, buffer: 'arglbarf' }),
    expect: is.error,
    info: 'Calling STYLUS with invalid css errors',
  },
]
