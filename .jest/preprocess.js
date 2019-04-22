const babelOptions = {
  presets: ["babel-preset-gatsby"],
  env: {
    test: {
      plugins: ["require-context-hook"]
    }
  }
}

module.exports = require("babel-jest").createTransformer(babelOptions)
