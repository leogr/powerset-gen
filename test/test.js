const { equal, deepEqual } = require("assert")

const builds = ["es6", "es5"]

builds.forEach((buildName) => {
  const generator = require(`../dist/${buildName}.umd`)

  describe(`[${buildName}] Generator`, () => {

    it("works with for/of", () => {
      const expected = [
        [],
        [ "a" ],
        [ "b" ],
        [ "a", "b" ],
        [ "c" ],
        [ "a", "c" ],
        [ "b", "c" ],
        [ "a", "b", "c" ]
      ]

      const actual = []

      for (const subset of generator(["a", "b", "c"])) {
        actual.push(subset)
      }

      deepEqual(actual, expected)
    })

    it("works with spread operator", () => {
      const expected = [
        [], [ "a" ], [ "b" ], [ "a", "b" ]
      ]

      const actual = [...generator([ "a", "b" ])]

      deepEqual(actual, expected)
    })

    it("works with Array.from", () => {
      const expected = [
        [], [ "a" ], [ "b" ], [ "a", "b" ]
      ]

      const actual = Array.from(generator([ "a", "b" ]))

      deepEqual(actual, expected)
    })

    it("can use a map function", () => {
      for (const actual of generator(["a", "b", "c"], () => "test")) {
        equal(actual, "test")
      }
    })

    it("can map indexes", () => {
      const expected = [
        [],
        [ "a" ],
        [ "b" ],
        [ "a", "b" ],
        [ "c" ],
        [ "a", "c" ],
        [ "b", "c" ],
        [ "a", "b", "c" ]
      ]

      const actual = []
      let c = 0
      for (const [index, subset] of generator(["a", "b", "c"], (value, i) => [i, value])) {
        equal(index, c++)
        actual.push(subset)
      }

      deepEqual(actual, expected)
    })

    it("can manipulate generated results", () => {
      const expected = [
        [ "x" ],
        [ "a", "x" ],
        [ "b", "x" ],
        [ "a", "b", "x" ],
        [ "c", "x" ],
        [ "a", "c", "x" ],
        [ "b", "c", "x" ],
        [ "a", "b", "c", "x" ]
      ]


      const actual = []
      let c = 0
      const map = (value, i) => {
        value.push("x")
        return [i.toString(2), value]
      }

      for (const [mask, subset] of generator(["a", "b", "c"], map)) {
        equal(mask, c.toString(2))
        actual.push(subset)
        c++
      }

      deepEqual(actual, expected)
    })
  })


})
