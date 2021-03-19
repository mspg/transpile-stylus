// integration test for the build system.
// builds the example/ directory and tests the resulting files

import util from 'util'
import path from 'path'
import { exec } from 'child_process'

import { fs } from '@magic/test'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const xc = util.promisify(exec)

const beforeAll = async () => {
  try {
    const cmd = 'mspg clean build zip'
    await xc(cmd)
  } catch (e) {
    throw e
  }
}

const exampleFile = path.join(__dirname, '..', 'example', 'public', 'main.css')
const fileExists = async () => await fs.exists(exampleFile)
const fileContents = async () => await fs.readFile(exampleFile, 'utf8')
const variablesFileWorks = s => s.includes('.green{color:#008100;}')
const importFileWorks = s => s.includes('.green{color:#008100;}')

export default {
  beforeAll,
  tests: [
    { fn: fileExists, expect: true, info: 'public/main.css exists' },
    {
      fn: fileContents,
      expect: variablesFileWorks,
      info: 'public/main.css content is built correctly',
    },
    {
      fn: fileContents,
      expect: importFileWorks,
      info: 'public/main.css contains reset.css',
    },
  ],
}
