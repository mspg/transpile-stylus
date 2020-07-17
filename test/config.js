import { is } from '@magic/test'
import conf from '../config.js'

export default [
  { fn: () => conf.TRANSPILERS.css, expect: is.fn, info: 'css transpile is a function' },
]
