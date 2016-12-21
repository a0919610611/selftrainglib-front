var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Path = require('path');
module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
    resolve: {
        extensions: ['', '.js', '.jsx',]
    },
    module: {
        loaders: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loaders: ['babel-loader'],
                include: Path.join(__dirname, 'src/')
            },
            {
                test: /\.sass$/, loader: "style!css!sass"
            },
            {
                test: /\.css$/, loader: 'style!css'
            },
        ]
    },

    plugins:[
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
    ],
  devServer: {

      historyApiFallback: true,
        contentBase: './',
      hot: true,
      port: 4000,
      proxy: {
          '/api/*': {
              // target: 'http://localhost:8000',
              target: 'http://hall.lib.nctu.edu.tw',
              changeOrigin: true,
              secure: false
          }
      }
  }
};
