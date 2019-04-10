# Dicebot

A simple function which takes a `string` (or `number`) and returns some dice stats

## Installation

`npm i -S dicebot`

## Usage

```js
const roll = require('dicebot')

const {values, sum, average} = roll(6)

roll(6)             // values = [ 1 -> 6 ]
roll('6 6 6')       // values = [ 1 -> 6, 1 -> 6, 1 -> 6, 1 -> 6 ]
roll('d6')          // values = [ 1 -> 6 ]
roll('4D6')         // values = [ (1 -> 6) + (1 -> 6) + (1 -> 6) + (1 -> 6) ]
roll('10*(4d6+50)') // values = [ 10 * ((4 lots of 1 -> 6) + 50) ]
roll('heads tails')       // values = [ heads or tails ]
roll('a,b,c')       // values = [ one of a, b, or c ]
roll('a b c d3')    // values = [ one of a, b, c, 1, 2, 3 ]
```