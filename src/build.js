import path from 'path'
import fs from '@magic/fs'
import util from 'util'

// css builders
import stylus from 'stylus'
import autoprefixer from 'autoprefixer-stylus'

// stylus build task
export const build = async (props, config) => {
  try {
    const name = path.basename(props.name)

    const style = stylus(props.buffer)
      .set('filename', name)
      .set('paths', [config.CSS_DIR])
      .set('sourcemap', {})
      .define('WEB_ROOT', config.ENV !== 'development' && config.WEB_ROOT ? config.WEB_ROOT : '/')
      .use(autoprefixer())

    const varFile = path.join(config.CSS_DIR, 'variables.styl')
    if (await fs.exists(varFile)) {
      style.import(varFile)
    }

    const mixinFile = path.join(config.CSS_DIR, 'mixins.styl')
    if (await fs.exists(mixinFile)) {
      style.import(mixinFile)
    }

    style.render = util.promisify(style.render)
    const css = await style.render()
    
    return {
      buffer: css,
      sourcemap: style.sourcemap,
    }
  } catch (e) {
    return e
  }
}

export default build
