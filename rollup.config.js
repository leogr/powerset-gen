import buble from "rollup-plugin-buble"

export default [
  {
    entry: "generator.js",
    sourceMap: true,
    targets: [
      {
        format: "cjs",
        dest: "dist/es6.umd.js"
      },
      {
        format: "es",
        dest: "dist/es6.esm.js"
      }
    ]
  },
  {
    entry: "generator.legacy.js",
    plugins: [
      buble({
        target: {
          node: "0.12"
        }
      })
    ],
    sourceMap: true,
    targets: [
      {
        format: "cjs",
        dest: "dist/es5.umd.js"
      },
      {
        format: "es",
        dest: "dist/es5.esm.js"
      }
    ]
  }
]
