#### mspg-stylus

mspg stylus transpiles stylus to css,
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
