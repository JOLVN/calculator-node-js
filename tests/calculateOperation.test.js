const calculateOperation = require('../calculateOperation')


test('Basic addition', () => {
    const result = calculateOperation('1 + 2')
    expect(result).toBe(eval(result))
})

test('Complex addition', () => {
    const result = calculateOperation('21 +130 + 792+ 972 + 1 +2729')
    expect(result).toBe(eval(result))
})

test('Addition and substraction', () => {
    const result = calculateOperation('21 +130 - 792+ 972 - 1 +2729')
    expect(result).toBe(eval(result))
})

test('Random minus', () => {
    const result = calculateOperation('-21 +130 -- 792+ 972 - 1+-2729')
    expect(result).toBe(eval(result))
})

test('Multpilpication and division priority', () => {
    const result = calculateOperation('26+2*2 - 60 / 2 + 3 - 6*6')
    expect(result).toBe(eval(result))
})

test('Float number operation', () => {
    const result = calculateOperation('-26.54+2*2.5 - 60 / 2 + 3 - 6*6')
    expect(result).toBe(eval(result))
})

test('Parentheses priority', () => {
    const result = calculateOperation('62-3+5*(2+2)-8*(8+2)')
    expect(result).toBe(eval(result))
})

test('Complex operation', () => {
    const result = calculateOperation('-72829.362+3868*2-28/(2+2)*-2+9--282.208/(27+2)')
    expect(result).toBe(eval(result))
})