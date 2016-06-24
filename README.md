# Typescript Angular 2 + Node.js Starter Project with Linting, Minification, and Bundling

## About
* Demo hosted on [Heroku](https://tour-of-heroes-typescript.herokuapp.com/)
    (Using free dynos which sleep during inactivity, so initial load may be slow)
* Angular 2 Code in Typescript 1.8 with SystemJS for module loading
    * Decouples components, models, services, and templates
    * Typings will be used to manage type definitions until [Typescript 2.0]
    (https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/)
* Styles in SCSS
    * Global styles are concatenated
    * Component styles are lazy loaded individually
* HTML templates as Typescript strings
    * Allows for in-lining of templates at compilation, avoiding additional the network request that using "templateUrl" adds
    * Allows templates to live in external files for code clarity and scaling
    * Can be easily migrated to a plain HTML file once Typescript "import file as string" functionality is in place
    * Webstorm html syntax highlighting still works correctly
* Project building and bundling with Gulp
    * Linting runs before compilation, minification, and bundling
    * Express serves static files from "public" directory
    * "public/dist" contains our compiled, bundled, and minified "src"
    * "public/lib" contains our compiled, bundled, and minified dependencies

## Installation
* `npm install -g gulp typings`: installs Gulp and Typings globally
* `npm install`: installs node modules locally then triggers type definition
 installation and builds the app

## Build and Run
### Automatically
* `gulp`: lints, builds, and restarts web server on changes
    (Branch changes will cause server to crash; stop and start before doing so)

If no code has changed since your last build, you can just run:

* `gulp serve`: starts web server with a watcher that will recompile any changed files
    (will not trigger recompilation on any files changed before task starts)

### Manually
1. `gulp build`: lints, compiles, and compresses static files
2. `npm start`: starts web server on port 8080
3. Repeat steps 1 & 2 on any file change

## Testing with Jasmine
* `npm run test`: watches and compiles files on changes, opens browser to see test runs
    (Initially it may show "No specs found", but browser will automatically reload on changes.)
* `gulp clean:tests`: optionally clear test build directory

## Additional Commands
* `gulp tsconfig-glob`: populates 'files' in tsconfig.json from 'filesGlob'
* `gulp styles`: lints, compiles, compresses Sass to CSS only
* `gulp scripts`: lints, compiles, compresses Typescript to JS only
* `gulp lint`: lints Typescript and SCSS files
* `gulp clean`: clears all built files
* `typings install`: installs type definitions