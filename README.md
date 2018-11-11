#### @mspg/transpile-stylus

[![NPM version][npm-image]][npm-url]
[![Linux Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]

transpiles stylus to css,
then uses a very simple css simplifier.

##### Usage:
First set up a [mspg](https://github.com/mspg/core) project.

then, in src/config.js
```javascript
  const CSS = require('@mspg/transpile-stylus')

  module.exports = {
    TRANSPILERS: {
      CSS,
    },
  }
```

You should not change the extensions of the \*.css files in the /src directory,
you can just use stylus in them now.

You can also use the /includes/css directory to create \*.styl files and @import them from the css files in /src.

If /includes/css/variables.styl exists, it will be imported and the variables in it will be available in all css files.

[npm-image]: https://img.shields.io/npm/v/@mspg/transpile-stylus.svg
[npm-url]: https://www.npmjs.com/package/@mspg/transpile-stylus
[travis-image]: https://travis-ci.org/mspg/transpile-stylus.svg?branch=master
[travis-url]: https://travis-ci.org/mspg/transpile-stylus
[appveyor-image]: https://ci.appveyor.com/api/projects/status/5s5716td6kwnydip?svg=true
[appveyor-url]: https://ci.appveyor.com/project/jaeh/transpile-stylus/branch/master
[coveralls-image]: https://coveralls.io/repos/github/mspg/transpile-stylus/badge.svg
[coveralls-url]: https://coveralls.io/github/mspg/transpile-stylus
