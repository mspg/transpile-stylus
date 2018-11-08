const util = require('util')
const path = require('path')

// css builders
const stylus = require('stylus')
const nib = require('nib')
const autoprefixer = require('autoprefixer-stylus')

const log = require('@magic/log')

// stylus build task
const style = (string, config) =>
  new Promise((resolve, reject) => {
    stylus(string)
      .set('paths', [config.CSS_DIR])
      .set('sourcemap', {})
      .define('WEB_ROOT', config.ENV !== 'development' && config.WEB_ROOT ? config.WEB_ROOT : '/')
      .use(nib())
      .use(autoprefixer())
      .import(path.join(config.CSS_DIR, 'variables'))
      .render((err, css) => (err ? reject(err) : resolve(css)))
  })

const minify = style =>
  style
    // replace newlines after commas to get multiple css classes onto one line
    .replace(/,\n/gim, ', ')
    // replace all whitespaces with one space per whitespace group (\n\t\n === ' ').
    .replace(/\s\s+/gim, ' ')
    // replace newlines before } to get all declarations onto one line
    .replace(/\n}/gim, '}')
    // remove spaces around opening brackets {
    .replace(/\s{\s+/gim, '{')
    // remove spaces after :
    .replace(/:\s/gim, ':')

const STYLUS = async ({ buffer, config }) => {
  try {
    if (buffer && typeof buffer !== 'string' && typeof buffer.toString === 'function') {
      buffer = buffer.toString()
    }

    if (!buffer || !buffer.length) {
      throw new Error('STYLUS: expect first argument to include { buffer }')
    }

    const css = await style(buffer, config)
    const minified = minify(css)
    return minified
  } catch(e) {
    throw e
  }
}

module.exports = STYLUS
