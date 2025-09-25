module.exports = function (context, options) {
  return {
    name: 'yaml-loader-plugin',
    configureWebpack(config, isServer) {
      return {
        module: {
          rules: [
            {
              test: /\.ya?ml$/,
              use: 'yaml-loader',
            },
          ],
        },
      }
    },
  }
}
