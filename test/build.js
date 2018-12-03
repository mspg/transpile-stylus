// integration test for the build system.
// builds the example/ directory and tests the resulting files

const util = require('util')
const path = require('path')
const { exec } = require('child_process')
const nfs = require('fs')

const { is } = require('@magic/test')

const xc = util.promisify(exec)
const fs = {
  readFile: util.promisify(nfs.readFile),
  exists: util.promisify(nfs.exists),
}

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
const variablesFileWorks = s => s.includes('body{line-height:1;color:#000;background:#fff;}')
const resetCssWorks = s => s.startsWith('html,body,div,span,')
const importFileWorks = s => s.includes('.green{color:#008000;}')

const zipFile = path.join(__dirname, '..', 'example', 'public', 'main.css.gz')
const zipFileExists = async () => await fs.exists(zipFile)

module.exports = {
  beforeAll,
  tests: [
    { fn: fileExists, expect: true, info: 'public/main.css exists' },
    { fn: zipFileExists, expect: true, info: 'public/main.css.gz exists' },
    {
      fn: fileContents,
      expect: variablesFileWorks,
      info: 'public/main.css content is built correctly',
    },
    {
      fn: fileContents,
      expect: resetCssWorks,
      info: 'public/main.css contains reset.css',
    },
    {
      fn: fileContents,
      expect: importFileWorks,
      info: 'public/main.css contains reset.css',
    },
  ],
}