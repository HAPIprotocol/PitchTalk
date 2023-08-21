const webpack = require('webpack');

// Buffer is not defined, error fix for react-scripts@5.0.0+
// https://stackoverflow.com/questions/68707553/uncaught-referenceerror-buffer-is-not-defined

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer'),
  };
  config.resolve.extensions = [...config.resolve.extensions, '.ts', '.js'];
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    }),
  ];
  return config;
};
