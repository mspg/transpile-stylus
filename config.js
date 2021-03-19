import path from 'path'
import css from './src/index.js'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const isDev = process.env.NODE_ENV !== 'production'

export default {
  TRANSPILERS: {
    css,
  },
  // files get loaded from example/src and example/includes
  CWD: path.join(__dirname, 'example'),
  // and published in example/publish
  OUT_DIR: path.join(__dirname, 'example', 'public'),
  // web root of the github page
  WEB_ROOT: isDev ? '/' : 'https://mspg.github.io/transpile-stylus/',
}
