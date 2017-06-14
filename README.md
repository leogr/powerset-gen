# powerset-gen
A generator function that produces all subsets of the given set in input.

## Install

```
npm install powerset-gen
```

## Usage

Both ES6 Module and CommonJS distributions are provided by this package.

### ES6 Module

```js
import generator from "poweset-get"
```

### ES5 / CommonJS

```js
var generator = require("powerset-gen");
```

## API

The module exports the following function.

### **generator(set, [mapper])** ⇒ `Generator`

| Param | Type | Default | Description |
| --- | --- | --- |  --- |
| set | `Array` | | The given set in input |
| mapper | `Function` | `(value, index) => value` | *(optional)* Function that maps the yielded value, taking two arguments: <br> - `value` The current subset being generated <br> - `index` The index of the current subset being generated |

## Examples

### for..of
```js
for (const subset of generator(["a", "b", "c"])) {
  console.log(subset)
}
```

Output
```js
[]
["a"]
["b"]
["a", "b"]
["c"]
["a", "c"]
["b", "c"]
["a", "b", "c"]
```

### Generate an `Array`
```js
[...generator(["a", "b"])]
// or
Array.from(generator(["a", "b"]))
```

### Generate a `Set`
```js
new Set(generator(["a", "b"]))
```

### Spreading in function call
```js
console.log(...generator(["a", "b"]))
```

### Indexes
```js

for (const [index, subset] of generator(["a", "b", "c"], (value, i) => [i, value])) {
  console.log(index, subset)
}
```

Output
```js
0 []
1 ["a"]
2 ["b"]
3 ["a", "b"]
4 ["c"]
5 ["a", "c"]
6 ["b", "c"]
7 ["a", "b", "c"]
```

### Binary mask
```js

for (const [mask, subset] of generator(["a", "b", "c"], (value, index) => [index.toString(2), value])) {
  console.log(mask, subset)
}
```

Output
```js
0 []
1 ["a"]
10 ["b"]
11 ["a", "b"]
100 ["c"]
101 ["a", "c"]
110 ["b", "c"]
111 ["a", "b", "c"]
```

