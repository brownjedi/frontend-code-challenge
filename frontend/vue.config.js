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
      sass: {
        prependData: `
          @import "@/styles/_variables.scss";
          @import "@/styles/_breakpoints.scss";
        `,
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map',
  },
}
