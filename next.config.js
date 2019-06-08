const path = require("path");
const glob = require("glob");
const withSass = require("@zeit/next-sass");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { ANALYZE } = process.env;

const NextWorkboxPlugin = require("next-workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = withSass({
  cssModules: false,
  webpack(config, { isServer, buildId, dev }) {
    // if (ANALYZE) {
    //   config.plugins.push(
    //     new BundleAnalyzerPlugin({
    //       analyzerMode: "server",
    //       analyzerPort: 8888,
    //       openAnalyzer: true
    //     })
    //   );
    // } else {
    //   config.module.rules.push(
    //     {
    //       test: /\.css$/,
    //       use: ['css-loader']
    //     }, {
    //       test: /\.(png|woff|woff2|eot|ttf|svg|gif|jpg)$/,
    //       loader: 'file-loader',
    //       options: {
    //         publicPath: '/_next/static/',
    //         outputPath: "static/"
    //       }
    //     }
    //   );
    // }

    const workboxOptions = {
      clientsClaim: true,
      skipWaiting: true,
      globPatterns: [".next/static/*", ".next/static/commons/*"],
      modifyUrlPrefix: { ".next": "/_next" },
      runtimeCaching: []
    };

    if (!isServer) {
      config.plugins.push(
        new NextWorkboxPlugin({
          buildId,
          ...workboxOptions
        }),
        new WebpackPwaManifest({
          filename: "static/manifest.json",
          name: "GrowReel",
          short_name: "GrowReel",
          description:
            "Video hosting site for everything to do with gardening.",
          background_color: "#000000",
          theme_color: "#79B83E",
          display: "standalone",
          orientation: "portrait",
          fingerprints: false,
          inject: false,
          start_url: "./",
          ios: {
            "apple-mobile-web-app-title": "GrowReel",
            "apple-mobile-web-app-status-bar-style": "#79B83E"
          },
          icons: [
            {
              src: path.resolve("static/icons/512px_icon.png"),
              sizes: [96, 128, 192, 256, 384, 512]
            }
          ],
          publicPath: ".."
        }),
        new ManifestPlugin({
          fileName: "asset-manifest.json" // Not to confuse with manifest.json
        })
      );
    }

    config.module.rules.push(
      { test: /\.css$/, use: ["css-loader"] },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|gif|jpg)$/,
        loader: "file-loader",
        options: { publicPath: "/_next/static/", outputPath: "static/" }
      }
    );

    return config;
  }
});
