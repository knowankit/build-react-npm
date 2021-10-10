const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
  const config = {
    mode: env.development ? 'development' : 'production',
    devtool: 'inline-source-map',
    entry: {
      main: env.development
        ? `${path.resolve(__dirname, './src/index.tsx')}`
        : `${path.resolve(__dirname, './src/example-component.tsx')}`
    },
    devServer: {
      port: 3000,
      watchContentBase: true,
      hot: true,
      open: true,
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /(node_modules)/,
          use: ['ts-loader']
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource'
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: 'asset/inline'
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index.js',
      libraryTarget: env.development ? '' : 'commonjs2'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [new CleanWebpackPlugin()],
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    }
  };

  if (env.development) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
        filename: 'index.html'
      })
    );

    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    });
  }

  if (env.production) {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'index.css'
      })
    );

    config.module.rules.push({
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, 'css-loader']
    });
  }

  return config;
};
