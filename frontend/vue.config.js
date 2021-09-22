module.exports = {
  pluginOptions: {
    apollo: {
      lintGQL: true,
    },
  },
  css: {
    loaderOptions: {
      css: {
        localsConvention: 'camelCase',
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map',
  },
}
