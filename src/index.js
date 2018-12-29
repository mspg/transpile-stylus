const build = require('./build')

const STYLUS = async props => {
  let { buffer } = props
  try {
    if (buffer && typeof buffer !== 'string' && typeof buffer.toString === 'function') {
      buffer = buffer.toString()
    }

    if (!buffer || !buffer.length) {
      throw new Error('STYLUS: expect first argument to include { buffer }')
    }

    const css = await build({ ...props, buffer })
    return css
  } catch (e) {
    throw e
  }
}

module.exports = STYLUS
