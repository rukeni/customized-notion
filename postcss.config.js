const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
    cssnano: {},
  }
}