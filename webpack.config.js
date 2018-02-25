var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: true
      },
      template: './index.html'
    }),
    new CopyWebpackPlugin([{from:'./img',to:'./'} ])
  ]
};