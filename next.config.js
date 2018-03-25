require('@remy/envy');
const webpack = require('webpack');
const withCSS = require('@zeit/next-css');

const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

module.exports = withCSS(
  withBundleAnalyzer({
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../../bundles/server.html',
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html',
      },
      openAnalyzer: true,
    },
    cssModules: false,
    webpack: config => {
      config.plugins.push(
        new webpack.EnvironmentPlugin([
          'SHOW_SPEAKER',
          'PORT',
          'API',
          'NOW_URL',
        ])
      );

      return config;
    },
  })
);