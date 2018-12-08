#### @mspg/transpile-stylus

[![Greenkeeper badge](https://badges.greenkeeper.io/mspg/transpile-stylus.svg)](https://greenkeeper.io/)

[![NPM version][npm-image]][npm-url]
[![Linux Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]

transpiles stylus to css,
then uses a very simple css simplifier.

##### usage:
first set up a [mspg](https://github.com/mspg/core) project.

then, in src/config.js
```javascript
const CSS = require('@mspg/transpile-stylus')

module.exports = {
  TRANSPILERS: {
    CSS,
  },
}
```

###### src directory file extensions unchanged
do not rename the \*.css files in the /src directory,
you can just use stylus in them now.

###### include/extend
you can also use the /includes/css directory to create \*.styl files and @import them from the css files in /src.

###### variables
if /includes/css/variables.styl exists, it will be imported and the variables in it will be available in all css files.

###### mixins
if /includes/css/mixins.styl exists, it will be imported and the mixins in it will be available in all css files.

###### css reset
if you add
```css
@import 'nib'
reset-css()
```
at the top of your css, nib will be available and a css reset applied

###### example app
a minimal example app is in the [example][example-url] directory of this repository,
using [config.js][config-url] from the root directory

###### example app on github.io
the example app is published to the [gh-pages][gh-pages] branch.
it is hosted @ [https://mspg.github.io/transpile-stylus][page-url]


[npm-image]: https://img.shields.io/npm/v/@mspg/transpile-stylus.svg
[npm-url]: https://www.npmjs.com/package/@mspg/transpile-stylus
[travis-image]: https://travis-ci.org/mspg/transpile-stylus.svg?branch=master
[travis-url]: https://travis-ci.org/mspg/transpile-stylus
[appveyor-image]: https://ci.appveyor.com/api/projects/status/5s5716td6kwnydip?svg=true
[appveyor-url]: https://ci.appveyor.com/project/jaeh/transpile-stylus/branch/master
[coveralls-image]: https://coveralls.io/repos/github/mspg/transpile-stylus/badge.svg
[coveralls-url]: https://coveralls.io/github/mspg/transpile-stylus
[example-url]: https://github.com/mspg/transpile-stylus/tree/master/example
[config-url]: https://github.com/mspg/transpile-stylus/blob/master/config.js
[core-url]: https://github.com/mspg/core
[gh-pages]: https://github.com/mspg/transpile-stylus/tree/gh-pages
[page-url]: https://mspg.github.io/transpile-stylus
