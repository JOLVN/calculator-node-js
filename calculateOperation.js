const findOperationNumber = require('./functions/findOperationNumber')
const findOperatorIndex = require('./functions/findOperatorIndex')

const calculateOperation = (operation) => {
    
    let result = null
    let areParentheses = false
    let a, b = 0
    let operator = ''
    let operatorIndex = null
    
    // Remove spaces
    operation = operation.replace(/\s+/g, '')

    for (let i = 0; i < operation.length; i++) {
        let element = operation[i]
        
        // If element is a number -> change its type to 'number'
        if (Number(element) || element == 0) {
            element = Number(element)
        }

        // Operator or parenthese
        else if (element != '.' && i > 0) {

            // For parentheses priority
            if (operation[i] == '(') {
                areParentheses = true
                operatorIndex = findOperatorIndex(operation, i)
            }

            // For operators priority
            else if (!operatorIndex && (operation[i] == '*' || operation[i] == '/')) {
                operatorIndex = i
            }

            // Addition or substraction
            else if (!operatorIndex) {
                operatorIndex = i
            }
        
        }

    }

    // Calcul with found operation
    a = findOperationNumber(operation, operatorIndex, true)
    b = findOperationNumber(operation, operatorIndex, false)
    operator = operation[operatorIndex]
    result = calculate[operator](a, b)

    // Check if there is more calcul to make
    const stringToReplace = areParentheses ? `(${a + operator + b})` : a + operator + b
    if (stringToReplace.length < operation.length) {
        const newOperation = operation.replace(stringToReplace, result)
        return calculateOperation(newOperation)
    }

    // Return the result
    return result

}

const calculate = {
    '+': (a, b) => Number(a) + Number(b),
    '-': (a, b) => Number(a) - Number(b),
    '*': (a, b) => Number(a) * Number(b),
    '/': (a, b) => Number(a) / Number(b)
}

module.exports = calculateOperation