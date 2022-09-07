const reverseString = require('./reverseString')

// Find numbers of the operation
const findOperationNumber = (operation, operatorIndex, leftSide) => {
    number = leftSide ? operation[operatorIndex  - 1] : operation[operatorIndex + 1]

    for (let y =  leftSide ? operatorIndex - 2 : operatorIndex + 2; leftSide? y >= 0 : y < operation.length; leftSide ? y-- : y++) {
        let element = operation[y];
        if (Number(element) || element == '0' || element == '.') {
            number += element
        }
        else {
            if (leftSide) {
                number = reverseString(number)
                if (element == '-' && !operation[y-1]) {
                    number = -number
                }
                return number
            }
            return number
        }
    }
    return leftSide ? reverseString(number) : number

}

module.exports = findOperationNumber