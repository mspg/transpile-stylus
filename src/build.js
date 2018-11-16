const path = require('path')
const fs = require('fs')
const util = require('util')
const exists = util.promisify(fs.exists)

// css builders
const stylus = require('stylus')
const nib = require('nib')
const autoprefixer = require('autoprefixer-stylus')

// stylus build task
const build = async (string, config) => {
  try {
    const style = stylus(string)
      .set('paths', [config.CSS_DIR])
      .set('sourcemap', {})
      .define('WEB_ROOT', config.ENV !== 'development' && config.WEB_ROOT ? config.WEB_ROOT : '/')
      .use(nib())
      .use(autoprefixer())

    const varFile = path.join(config.CSS_DIR, 'variables.styl')
    if (await exists(varFile)) {
      style.import(varFile)
    }

    const mixinFile = path.join(config.CSS_DIR, 'mixins.styl')
    if (await exists(mixinFile)) {
      style.import(mixinFile)
    }

    style.render = util.promisify(style.render)
    const css = await style.render()
    return css
  } catch (e) {
    throw e
  }
}

module.exports = build
