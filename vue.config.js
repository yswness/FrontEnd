'use strict'

const path = require('path')

module.exports = {
  //Base path
  //Don't use ./
  publicPath: "/",

  outputDir: process.env.outputDir,

  devServer: {
    proxy: {
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },

    host: "localhost",
    port: 8080,
    https: false,
    open: true
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    // clear all existing loaders.
    // if you don't do this, the loader below will be appended to
    // existing loaders of the rule.
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include
        .add(path.resolve(__dirname, './src/assets/icons'))
        .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
}
