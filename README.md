# Typescript Angular 2 + Node.js Starter Project with Linting, Minification, and Bundling

## About
* Demo hosted on [Heroku](https://tour-of-heroes-typescript.herokuapp.com/)
    (Using free dynos which sleep during inactivity, so initial load may be slow)
* Webpack for module loading and bundling
    * See deprecated [SystemJS](https://github.com/smmorneau/tour-of-heroes/tree/v2.0) version
    * Different configs for development, production, and testing
* Angular 2 Code in Typescript
    * Scripts are split into "public/polyfills.js", "public/vendor.js", and "public/app.js"
* Styles in SCSS
    * Global styles are bundled into "public/styles.css"
    * Component styles are bundled with app into "public/app.js"

## Install
* `npm install`: installs dependencies

## Build
* `npm run build`: compiles and bundles assets
* `npm run watch`: builds then watches for changes

## Serve
* `npm start`: starts web server on port 8080

## Test
* `npm run test`: runs specs in headless Chrome with coverage report
