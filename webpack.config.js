const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const root = path.join.bind(path, path.resolve(__dirname));

// Webpack Config
const webpackConfig = {
  entry: {
    app: './src/ts/main.ts',
    polyfills: './src/ts/polyfills.ts',
    vendor: './src/ts/vendor.ts'
  },

  output: {
    publicPath: '/public/js',
    path: path.resolve(__dirname, './public/js'),
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, '/src')
    ),
    new webpack.ProvidePlugin({
      'lodash': 'lodash',
      'moment': 'moment',
      'moment-timezone': 'moment-timezone'
    }),
    new ExtractTextPlugin('../css/styles.css')
  ],

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader'
        ]
      },
      {
        test: /\.scss$/,
        loaders: ['to-string-loader', 'css-loader?minimize=true', 'postcss-loader', 'sass-loader'],
        exclude: [/\.global\.scss$/, /node_modules/]
      },
      {
        test: /\.global\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize=true', 'postcss-loader', 'sass-loader']
        }),
        include: [root('src', 'scss')],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?minimize=true'
        }),
        include: [root('src', 'scss'), /node_modules/]
      },
      {test: /\.html$/, loader: 'raw-loader'},
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: '../fonts/[name].[ext]',
          publicPath: '/fonts/'
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: '../fonts/[name].[ext]',
          publicPath: '/fonts/'
        }
      },
    ]
  }
};

const defaultConfig = {
  devtool: 'source-map',

  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: [ '.ts', '.js' ],
    modules: [ path.resolve(__dirname, 'node_modules') ]
  },

  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false,
    clearImmediate: false,
    setImmediate: false
  }
};

const commonConfig = webpackMerge(defaultConfig, webpackConfig);

const prodConfig = {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        sequences     : true,  // join consecutive statemets with the “comma operator”
        properties    : true,  // optimize property access: a["foo"] → a.foo
        dead_code     : true,  // discard unreachable code
        drop_debugger : true,  // discard “debugger” statements
        unsafe        : false, // some unsafe optimizations (see below)
        conditionals  : true,  // optimize if-s and conditional expressions
        comparisons   : true,  // optimize comparisons
        evaluate      : true,  // evaluate constant expressions
        booleans      : true,  // optimize boolean expressions
        loops         : true,  // optimize loops
        unused        : true,  // drop unused variables/functions
        hoist_funs    : true,  // hoist function declarations
        hoist_vars    : false, // hoist variable declarations
        if_return     : true,  // optimize if-s followed by return/continue
        join_vars     : true,  // join var declarations
        cascade       : true,  // try to cascade `right` into `left` in sequences
        side_effects  : true,  // drop side-effect-free statements
        warnings      : true,  // warn about potentially dangerous optimizations/code
      },
      output: {
        comments: false,
        space_colon: false
      }
    }),
    new OptimizeJsPlugin({
      sourceMap: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
};

const testConfig = {
  devtool: 'inline-source-map',
  module: {
    rules: [
      {test: /\.scss$/, loaders: ['raw-loader', 'postcss-loader', 'sass-loader'], exclude: [/\.global\.scss$/, /node_modules/]},
      {test: /\.global\.scss$/, loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'], exclude: [/node_modules/]},
      {test: /\.css$/, loaders: ['style-loader', 'css-loader'], include: [/node_modules/]},
      {test: /\.css$/, loaders: ['to-string-loader', 'css-loader'], exclude: [/node_modules/]},
      {test: /\.html$/, loader: 'raw-loader'},
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: '../fonts/[name].[ext]',
          publicPath: '/fonts/'
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: '../fonts/[name].[ext]',
          publicPath: '/fonts/'
        }
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            query: {
              // use inline sourcemaps for "karma-remap-coverage" reporter
              sourceMap: false,
              inlineSourceMap: true,
              compilerOptions: {

                // Remove TypeScript helpers to be injected
                // below by DefinePlugin
                removeComments: true

              }
            },
          },
          'angular2-template-loader'
        ],
        exclude: [/\.e2e\.ts$/]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [/spec-bundle\.js/, /node_modules/]
      },
      {
        enforce: 'post',
        test: /\.(js|ts)$/,
        loader: 'istanbul-instrumenter-loader',
        exclude: [
          /spec-bundle\.js/,
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ]
  }
};

const devConfig = {
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        options: {
          configFile: 'tslint.json'
        },
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules/]
      },
    ]
  },
  plugins: [
    new StyleLintPlugin({
      emitErrors: false,
      extends: "stylelint-config-standard",
      config: {
        rules: {
          "max-empty-lines": 1,
          "max-nesting-depth": 10
        }
      }
    })
  ]
};


switch (process.env.NODE_ENV) {
  case 'staging':
  case 'production':
    module.exports = webpackMerge(commonConfig, prodConfig);
    break;
  case 'test':
    module.exports = webpackMerge(commonConfig, testConfig);
    break;
  case 'development':
  default:
    module.exports = webpackMerge(commonConfig, devConfig);
}
