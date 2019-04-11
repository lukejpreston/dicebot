const dicebot = require('.')

expect.extend({
  toBeBetween (result, min, max) {
    const pass = result >= min && result <= max
    return {
      pass,
      message: () => `expected ${result} to be between ${min} and ${max} but it was not`
    }
  }
})

test('a number', () => {
  const result = dicebot(6)

  expect(result.values.length).toBe(1)

  expect(result.values[0]).toBeBetween(1, 6)

  expect(result.sum).toBeBetween(1, 6)
  expect(result.average).toBeBetween(1, 6)
})

test('multiple numbers', () => {
  const result = dicebot('6 6 6')

  expect(result.values.length).toBe(3)

  expect(result.values[0]).toBeBetween(1, 6)
  expect(result.values[1]).toBeBetween(1, 6)
  expect(result.values[2]).toBeBetween(1, 6)

  expect(result.sum).toBeBetween(1, 3 * 6)
  expect(result.average).toBeBetween(1, 3 * 6)
})

test('dY', () => {
  const result = dicebot('D6')

  expect(result.values.length).toBe(1)

  expect(result.values[0]).toBeBetween(1, 6)

  expect(result.sum).toBeBetween(1, 6)
  expect(result.average).toBeBetween(1, 6)
})

test('XDY XdY', () => {
  const result = dicebot('4D6 4d6')

  expect(result.values.length).toBe(8)

  expect(result.values[0]).toBeBetween(1, 6)
  expect(result.values[2]).toBeBetween(1, 6)
  expect(result.values[3]).toBeBetween(1, 6)
  expect(result.values[4]).toBeBetween(1, 6)
  expect(result.values[5]).toBeBetween(1, 6)
  expect(result.values[6]).toBeBetween(1, 6)
  expect(result.values[7]).toBeBetween(1, 6)

  expect(result.sum).toBeBetween(8, 8 * 24)
  expect(result.average).toBeBetween(1, 8 * 24)
})

test('arithmetic XdY', () => {
  const result = dicebot('10*(4d6+50)')

  expect(result.values.length).toBe(1)

  expect(result.values[0]).toBeBetween(10 * (4 + 50), 10 * (24 + 50))

  expect(result.sum).toBeBetween(10 * (4 + 50), 10 * (24 + 50))
  expect(result.average).toBeBetween(10 * (4 + 50), 10 * (24 + 50))
})

test('strings (with ds)', () => {
  const result = dicebot('heads tails')

  expect(result.values.length).toBe(1)

  expect(['heads', 'tails']).toContain(result.values[0])

  expect(result.sum).toBe(0)
  expect(result.average).toBe(0)
})

test('strings with d', () => {
  const result = dicebot('a b c d3')

  expect(result.values.length).toBe(1)

  expect(['a', 'b', 'c', 1, 2, 3]).toContain(result.values[0])

  expect(result.sum).toBeBetween(0, 3)
  expect(result.average).toBeBetween(0, 3)
})

test('comma delimiter', () => {
  const result = dicebot('a,b, c')

  expect(result.values.length).toBe(1)

  expect(['a', 'b', 'c']).toContain(result.values[0])

  expect(result.sum).toBe(0)
  expect(result.average).toBe(0)
})

test('performace 10,000 takes 1-2s 1,000,000 takes ~15s', () => {
  const result = dicebot(' a'.repeat(10000))
  expect(result.values.length).toBe(1)

  expect(['a', 'b', 'c']).toContain(result.values[0])

  expect(result.sum).toBe(0)
  expect(result.average).toBe(0)
})
