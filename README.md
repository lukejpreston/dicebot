# Dicebot

A simple function which takes a `string` (or `number`) and returns some dice stats

## Usage

`npm i -S dicebot`

```js
const dicebot = require('dicebot')

const {values, sum, average} = dicebot(6)

dicebot(6)             // values = [ 1->6 ]
dicebot('6 6 6')       // values = [ 1->6, 1->6, 1->6, 1->6 ]
dicebot('d6')          // values = [ 1->6 ]
dicebot('4D6')         // values = [ (1->6), (1->6), (1->6), (1->6) ]
dicebot('4D6 4d6')     // values = [ (1->6), (1->6), (1->6), (1->6), (1->6), (1->6), (1->6), (1->6) ]
dicebot('10*(4d6+50)') // values = [ calculation of 10 * ((4 lots of 1->6) + 50) ]
dicebot('sin(d180)')   // values = [ calculation of sin(1->180) ]
dicebot('heads tails') // values = [ heads or tails ]
dicebot('a,b,c')       // values = [ one of a, b, or c ]
dicebot('a b c d3')    // values = [ one of a, b, c, 1, 2, 3 ]
```

## Command Line Usage

`npm i -g dicebot`

```sh
dicebot 4d6 10d6
#    args 4d6
#  values 1->6,1->6,1->6,1->6
#     sum sum of (1->6,1->6,1->6,1->6)
# average average of (1->6,1->6,1->6,1->6)

dicebot --values 4d6 # 1->6 1->6 1->6 1->6
dicebot --sum 4d6 # sum of (1->6 1->6 1->6 1->6)
dicebot --average 4d6 # average of (1->6 1->6 1->6 1->6)
```

## Developing

```js
npm i
npm test
npm lint
```