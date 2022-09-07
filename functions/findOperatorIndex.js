const isAnOperator = require('./isAnOperator')

// Find the index of the operator
const findOperatorIndex = (operation, parentheseIndex) => {
    for (let i = parentheseIndex + 1; i < operation.length - 1; i++) {
        if (isAnOperator(operation, i)) {
            return i
        }
    }
}

module.exports = findOperatorIndex