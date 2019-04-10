# Dicebot

A simple function which takes a `string` (or `number`) and returns some dice stats

## Usage

`npm i -S dicebot`

```js
const dicebot = require('dicebot')

const {values, sum, average} = dicebot(6)

dicebot(6)             // values = [ 1 -> 6 ]
dicebot('6 6 6')       // values = [ 1 -> 6, 1 -> 6, 1 -> 6, 1 -> 6 ]
dicebot('d6')          // values = [ 1 -> 6 ]
dicebot('4D6')         // values = [ (1 -> 6) + (1 -> 6) + (1 -> 6) + (1 -> 6) ]
dicebot('10*(4d6+50)') // values = [ 10 * ((4 lots of 1 -> 6) + 50) ]
dicebot('heads tails') // values = [ heads or tails ]
dicebot('a,b,c')       // values = [ one of a, b, or c ]
dicebot('a b c d3')    // values = [ one of a, b, c, 1, 2, 3 ]
```

## Command Line Usage

`npm i -g dicebot`

```sh
dicebot 6             // values = [ 1 -> 6 ]
dicebot '6 6 6'       // values = [ 1 -> 6, 1 -> 6, 1 -> 6, 1 -> 6 ]
dicebot 'd6'          // values = [ 1 -> 6 ]
dicebot '4D6'         // values = [ (1 -> 6) + (1 -> 6) + (1 -> 6) + (1 -> 6) ]
dicebot '10*(4d6+50)' // values = [ 10 * ((4 lots of 1 -> 6) + 50) ]
dicebot 'heads tails' // values = [ heads or tails ]
dicebot 'a,b,c'       // values = [ one of a, b, or c ]
dicebot 'a b c d3'    // values = [ one of a, b, c, 1, 2, 3 ]
```

## Developing

```js
npm i
npm test
npm lint
```