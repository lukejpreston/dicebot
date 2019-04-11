# Dicebot

A simple function which takes a `string` (or `number`) and returns some dice stats

It works in the browser and from node. Checkout the [demo](https://lukejpreston.github.io/dicebot)

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
dicebot -v 4d6 # 1->6 1->6 1->6 1->6
dicebot --sum 4d6 # sum of (1->6 1->6 1->6 1->6)
dicebot -s 4d6 # sum of (1->6 1->6 1->6 1->6)
dicebot --average 4d6 # average of (1->6 1->6 1->6 1->6)
dicebot -a 4d6 # average of (1->6 1->6 1->6 1->6)
```

## FUN ZONE

Some aliases you might like to do

```sh
alias coin='dicebot heads tail -v'

alias d4='dicebot d4 -v'
alias d6='dicebot d6 -v'
alias d10='dicebot d10 -v'
alias d12='dicebot d12 -v'
alias d20='dicebot d20 -v'
alias d100='dicebot d100 -v'

play () {
    echo "'$1' tried to '$2' which was `dicebot AN_EPIC_FAILURE A_FAILURE A_MIXED_FAILURE A_MIXED_SUCCESS A_SUCCESS AN_EPIC_SUCCESS -v`"
}

play Luke "fried some bacon"
```

## Developing

```js
npm i
npm test
npm lint
npm start
```