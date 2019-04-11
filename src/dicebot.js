const Chance = require('chance')
const Validator = require('fastest-validator')
const Parser = require('expr-eval').Parser

const parser = new Parser()
const chance = Chance()

const v = new Validator()
const schema = {
  word: { type: 'number', convert: true }
}

const diceSum = (word) => {
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

const dice = (word) => {
  const re = /(\d*)d(\d+)/g
  const matched = re.exec(('' + word).toLowerCase())
  let res = []
  if (matched !== null) {
    const times = parseInt(matched[1], 10) || 1
    const sides = parseInt(matched[2], 10)
    for (let i = 0; i < times; i++) res.push(chance.integer({ min: 1, max: sides }))
  }
  return res
}

const rollNumbers = (numbers) => {
  return numbers.map(number => {
    if (typeof number === 'string') return dice(number)
    return [chance.integer({ min: 1, max: number })]
  }).reduce((acc, cur) => acc.concat(cur), [])
}

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
  const hasNoneDiceOrNumbers = words.some(word => typeof word === 'string' && word.toLowerCase().match(/(\d*)d(\d+)/g) === null)
  if (hasNoneDiceOrNumbers) {
    const rolledWords = words.map(diceSum)
    const hasNoneDiceOrNumbers = rolledWords.some(word => typeof word === 'string')
    if (hasNoneDiceOrNumbers) {
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
