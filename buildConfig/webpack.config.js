/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-24 16:55:58
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-06 14:30:21
 * @FilePath: \\buildConfig\\webpack.config.js
 * @Description: 默认设置
 *
 * https://blog.csdn.net/Zong_0915/article/details/115831373
 */
const path = require('path')
const ProvidePlugin = require('webpack').ProvidePlugin
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
  mode: "production",

  // 指定webpack打包的时候要使用的模块
  module: {
    // 指定要价在的规则
    rules: [{
      // test指定的是规则生效的文件,意思是，用ts-loader来处理以ts为结尾的文件
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [
        // 配置babel
        {
          // 指定加载器
          loader: 'babel-loader',
          // 设置babel
          options: {
            presets: ['@babel/preset-env']
          }
        },
        'ts-loader'
      ]
    }]
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new ProvidePlugin({
      loggerUtils: path.resolve(path.join(__dirname, '../src/lib/logger')),
      Record: [path.resolve(path.join(__dirname, '../src/lib/logger')), 'Record'],
      AwamTask: [path.resolve(path.join(__dirname, '../src/task/task')), 'AwamTask'],
      AwamWorker: [path.resolve(path.join(__dirname, '../src/task/worker')), 'AwamWorker'],
      AwamUtils: path.resolve(path.join(__dirname, '../src/lib/util/index')),
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }
}