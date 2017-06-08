const generator = (set, map = (value) => value) => ({
  [Symbol.iterator]: () => {
    let c = 0
    const cn = Math.pow(2, set.length)
    return {
      next: () => {
        if (c === 0) {
          c++
          return { value: map([], 0), done: false }
        }

        if (c < cn) {
          return {
            value: map(set.filter((value, index) => Math.pow(2, index) & c), c++),
            done: false
          }
        }

        return { value: undefined, done: true }
      }
    }
  }
})

export default generator
