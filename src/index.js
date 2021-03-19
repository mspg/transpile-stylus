import build from './build.js'

export const STYLUS = async (props) => {
  try {
    let { buffer, config } = props

    if (buffer && typeof buffer !== 'string' && typeof buffer.toString === 'function') {
      buffer = buffer.toString()
    }

    if (!buffer || !buffer.length) {
      throw new Error('STYLUS: expect first argument to include { buffer }')
    }

    const css = await build({ ...props, buffer }, config)
    return css
  } catch (e) {
    return e
  }
}

export default STYLUS
