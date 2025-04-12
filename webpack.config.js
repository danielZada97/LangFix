const path = require("path");

module.exports = {
  mode: "production", // or 'development' for easier debugging
  entry: "./background.js", // your main source file
  output: {
    filename: "background.bundle.js", // bundled file name
    path: path.resolve(__dirname, "dist"), // output directory
  },
  module: {
    rules: [
      // (Optional) Use babel-loader if you need to transpile ES6+ code:
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
