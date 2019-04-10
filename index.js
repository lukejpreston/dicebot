const Chance = require('chance')
const Validator = require('fastest-validator')
const Parser = require('expr-eval').Parser

const parser = new Parser()
const chance = Chance()

const v = new Validator()
const schema = {
  word: { type: 'number', convert: true }
}

const dice = (word) => {
  const re = /(\d*)d(\d+)/g
  const matched = re.exec(('' + word).toLowerCase())
  if (matched !== null) {
    const times = parseInt(matched[1], 10) || 1
    const sides = parseInt(matched[2], 10)
    let sum = 0
    for (let i = 0; i < times; i++) sum += chance.integer({ min: 1, max: sides })
    return sum
  }
  return word
}

const rollNumbers = (numbers) => numbers.map(number => chance.integer({ min: 1, max: number }))

module.exports = (input = '') => {
  input = '' + input
  const words = input.split(/\b/g)
    .map(word => word.trim())
    .filter(word => word !== '' && word !== ',')
    .map(word => {
      const isNumber = v.validate({ word }, schema)
      if (isNumber === true) return parseInt(word, 10)
      return word
    })

  let values = []
  let args = []
  const hasString = words.some(word => typeof word === 'string')
  if (hasString) {
    const rolledWords = words.map(dice)
    const hasString = rolledWords.some(word => typeof word === 'string')
    if (hasString) {
      try {
        values.push(parser.parse(rolledWords.join('')).evaluate())
        args = rolledWords
      } catch (ignoreError) {
        values.push(chance.pickone(rolledWords))
        args = rolledWords
      }
    } else {
      values = rolledWords
      args = rolledWords
    }
  } else {
    values = rollNumbers(words)
    args = words
  }

  const numbers = values.filter(value => typeof value === 'number')
  const sum = numbers.reduce((acc, cur) => acc + cur, 0)
  const average = (sum / numbers.length) || 0

  return {
    args,
    values,
    sum,
    average
  }
}
