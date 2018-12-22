'use strict';


const {
  pathTo,
  plugins,
  loaders,
} = require('./common');


module.exports = {
  devtool: `cheap-eval-source-map`,
  mode: 'development',
  entry: [
    pathTo(`example`, `index.js`),
  ],
  output: {
    filename: `bundle.js`,
    path: pathTo(`dev`)
  },
  plugins: [
    plugins.html
  ],
  module: {
    rules: [
      loaders.babel,
      loaders.css
    ]
  },
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
};
