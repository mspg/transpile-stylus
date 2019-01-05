const build = require('./build')

const STYLUS = async props => {
  try {
    let { buffer } = props

    if (buffer && typeof buffer !== 'string' && typeof buffer.toString === 'function') {
      buffer = buffer.toString()
    }

    if (!buffer || !buffer.length) {
      throw new Error('STYLUS: expect first argument to include { buffer }')
    }

    const css = await build({ ...props, buffer })
    return css
  } catch (e) {
    return e
  }
}

module.exports = STYLUS
