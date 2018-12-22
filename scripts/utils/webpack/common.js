'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const pathTo = p => path.join(process.cwd(), p);
exports.pathTo = pathTo;


exports.loaders = {
  css: {
    test: /\.css$/,
    loader: `style-loader!css-loader`,
    include: [pathTo(`src`), pathTo(`example`)]
  },
  babel: {
    test: /\.js$/,
    loader: `babel-loader`,
    include: [pathTo(`src`), pathTo(`example`)],
    options: {
      babelrc: false,
      presets: [
        `@babel/preset-react`,
        [`@babel/preset-env`, {modules: false}]
      ],
      plugins: [
        `@babel/plugin-proposal-object-rest-spread`,
      ],
    }
  }
};


exports.plugins = {
  html: new HtmlWebpackPlugin(),
};
