process.env.NODE_ENV = "development";

const fs = require("fs-extra");
const paths = require("react-scripts/config/paths");
const webpack = require("webpack");
const config = require("react-scripts/config/webpack.config")("development");

// the output directory of the development files
const outputPath = paths.appPath + "/build";
config.output.path = outputPath;

config.plugins = config.plugins.filter((p) => {
  return !(p instanceof webpack.HotModuleReplacementPlugin)
    && (p.constructor.name !== 'HtmlWebpackPlugin')
});

(async () => {
  await fs.emptyDir(outputPath)
  webpack(config).watch({}, (err) => {
    if (err) {
      console.error(err);
    } else {
      // copy the remaining thing from the public folder to the output folder
      fs.copySync(paths.appPublic, outputPath, {
        dereference: true,
        filter: file => file !== paths.appHtml
      });
    }
  });
})();
