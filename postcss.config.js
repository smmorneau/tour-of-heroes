const autoprefixer = require('autoprefixer');
const smartImport = require('postcss-smart-import');

module.exports = {
  plugins: [
    smartImport(),
    autoprefixer()
  ]
}