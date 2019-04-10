const roll = require('.')

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
  const result = roll(6)

  expect(result.values.length).toBe(1)

  expect(result.values[0]).toBeBetween(1, 6)

  expect(result.sum).toBeBetween(1, 6)
  expect(result.average).toBeBetween(1, 6)
})

test('multiple numbers', () => {
  const result = roll('6 6 6')

  expect(result.values.length).toBe(3)

  expect(result.values[0]).toBeBetween(1, 6)
  expect(result.values[1]).toBeBetween(1, 6)
  expect(result.values[2]).toBeBetween(1, 6)

  expect(result.sum).toBeBetween(1, 3 * 6)
  expect(result.average).toBeBetween(1, 3 * 6)
})

test('dY', () => {
  const result = roll('D6')

  expect(result.values.length).toBe(1)

  expect(result.values[0]).toBeBetween(1, 6)

  expect(result.sum).toBeBetween(1, 6)
  expect(result.average).toBeBetween(1, 6)
})

test('XdY', () => {
  const result = roll('4D6')

  expect(result.values.length).toBe(1)

  expect(result.values[0]).toBeBetween(4, 24)

  expect(result.sum).toBeBetween(4, 24)
  expect(result.average).toBeBetween(4, 24)
})

test('arithmetic XdY', () => {
  const result = roll('10*(4d6+50)')

  expect(result.values.length).toBe(1)

  expect(result.values[0]).toBeBetween(10 * (4 + 50), 10 * (24 + 50))

  expect(result.sum).toBeBetween(10 * (4 + 50), 10 * (24 + 50))
  expect(result.average).toBeBetween(10 * (4 + 50), 10 * (24 + 50))
})

test('strings', () => {
  const result = roll('luke matt tim')

  expect(result.values.length).toBe(1)

  expect(['luke', 'matt', 'tim']).toContain(result.values[0])

  expect(result.sum).toBe(0)
  expect(result.average).toBe(0)
})

test('strings with d', () => {
  const result = roll('luke matt tim d3')

  expect(result.values.length).toBe(1)

  expect(['luke', 'matt', 'tim', 1, 2, 3]).toContain(result.values[0])

  expect(result.sum).toBeBetween(0, 3)
  expect(result.average).toBeBetween(0, 3)
})

test('comma delimiter', () => {
  const result = roll('luke,matt, tim')

  expect(result.values.length).toBe(1)

  expect(['luke', 'matt', 'tim']).toContain(result.values[0])

  expect(result.sum).toBe(0)
  expect(result.average).toBe(0)
})
