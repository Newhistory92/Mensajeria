module.exports = {
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }]
  ],
  "plugins": [
    "@babel/plugin-transform-react-jsx",
    [
      "css-modules-transform",
      {
        "generateScopedName": "[name]__[local]___[hash:base64:5]",
        "extensions": [".css"]
      }
    ]
  ]
}