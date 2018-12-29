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

const expect = name => `.content #id .class p {\n  color: #008000;\n}\n/*# sourceMappingURL=${name}.css.map */`

const config = {
  CSS_DIR: path.join(__dirname, 'includes'),
  ENV: 'development',
}

const missingIncludeConfig = {
  ...config,
  INCUDE_DIR: __dirname,
}

module.exports = [
  { fn: () => STYLUS, expect: is.fn, info: 'STYLUS is a function' },
  {
    fn: async () => await STYLUS({ name: 'cssString.css', buffer: cssString, config }),
    expect: ({ buffer }) => buffer === expect('cssString'),
    info: 'can render css in development and imports /variables.styl',
  },
  {
    fn: async () => await STYLUS({ name: 'cssBuffer.css', buffer: cssBuffer, config }),
    expect: ({ buffer }) => buffer === expect('cssBuffer'),
    info: 'can render css in development and imports /variables.styl',
  },
  {
    fn: async () => await STYLUS({ name: 'cssEqual', buffer: cssBuffer, config }),
    expect: async () => await STYLUS({ name: 'cssEqual', buffer: cssString, config }),
    info: 'string and buffer inputs render to the same css string',
  },
  {
    fn: async () => await STYLUS({ name: 'orange', buffer: '.c\n  color orange', config: missingIncludeConfig }),
    expect: ({ buffer }) => buffer === '.c {\n  color: #ffa500;\n}\n/*# sourceMappingURL=orange.css.map */',
    info: 'missing variables.styl does not error',
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
