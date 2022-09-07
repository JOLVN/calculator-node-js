// Check if the character is an operator
const isAnOperator = (operation, index) => {
    const element = operation[index]
    if (element == '+' || element == '-' || element == '*' || element == '/') {
        return true
    }
    return false
}

module.exports = isAnOperator