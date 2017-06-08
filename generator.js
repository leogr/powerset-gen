const generator = function *(set, map = (value) => value) {

  yield map([], 0) // the empty set

  const cn = Math.pow(2, set.length)
  for (let c = 1; c < cn; c++) {
    yield map(set.filter((value, index) => Math.pow(2, index) & c), c)
  }
}

export default generator
