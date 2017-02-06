// https://github.com/insin/nwb/blob/master/docs/Configuration.md#webpack-configuration
// http://stackoverflow.com/questions/32296967/webpack-dev-server-doesnt-generate-source-maps
// https://webpack.github.io/docs/configuration.html#devtool
// https://github.com/insin/nwb/blob/master/docs/Configuration.md#webpack-configuration
// https://webpack.github.io/docs/configuration.html#output-devtoollinetoline
module.exports = {
  type: 'web-module',
  babel: {
    presets: ['stage-0'],
    plugins: ['transform-decorators-legacy'],
  },
  webpack: {
    extra: {
      devtool: '#source-map',
    }
  },
}
