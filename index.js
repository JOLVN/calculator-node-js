// Requires readline module and creates its interface
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});


// Ask a question and read the answer
const question = () => {
    readline.question(`Give an operation to calculate : `, (operation) => {

        // Get and display the result in the console
        const result = calculOperation(operation)

        // Display result
        if (result) {
            console.log(`The result is : ${result} \n`);
        }
        else {
            console.log("Please, insert an operation \n");
        }

        // Callback this function
        question()
    });

}

question()


const calculOperation = (operation) => {
    
    let result = null
    let areParentheses = false
    let a, b = 0
    let operator = ''
    let numberOfOperators = 0
    
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
            a = findOperationNumberBefore(operation, i)
            b = findOperationNumberAfter(operation, i)
            operator = element
            
            // Check if there is a prioritory operator
            for (let y = 0; y < operation.length; y++) {

                if (operation[y] == '(') {
                    areParentheses = true
                    const operatorIndex = findOperatorIndex(operation, y)
                    a = findOperationNumberBefore(operation, operatorIndex)
                    b = findOperationNumberAfter(operation, operatorIndex)
                    operator = operation[operatorIndex]
                    result = calculateOperation(a, b, operator)
                }

                else if (operation[y] == '*' || operation[y] == '/') {
                    numberOfOperators += 1
                    if (!result) {
                        a = findOperationNumberBefore(operation, y)
                        b = findOperationNumberAfter(operation, y)
                        operator = operation[y]
                        result = calculateOperation(a, b, operator)
                    }
                }


                // If this i an operator '+' OR '-', AND not a '-' at the begnning of the operation OR atfer another operator
                if (operation[y] == '+' || (operation[y] == '-' && !(operation[y] == '-' && (isAnOperator(operation, y-1) || y === 0)))) {
                    numberOfOperators += 1
                }
            }

            console.log(numberOfOperators)
            // Calculate operation if there was no priority operator
            if (!result) {
                result = calculateOperation(a, b, operator)
            }

            // Check if there is more calcul to make
            if (numberOfOperators > 1) {
                const stringToReplace = areParentheses ? `(${a + operator + b})` : a + operator + b
                const newOperation = operation.replace(stringToReplace, result)
                console.log(newOperation);
                
                // Calculate again
                return calculOperation(newOperation)
            }
            // Return the result
            return result
        
        }

    }

}



/**
 * FUNCTIONS
 */

// Calculate two numbers
const calculateOperation = (a, b, operator) => {
    a = Number(a)
    b = Number(b)

    switch (operator) {
        case '+':
            return a + b
        case '-':
            return a - b
        case '*':
            return a * b
        case '/':
            return a / b
            
    }
}

// Find the left side of the operation
const findOperationNumberBefore = (operation, operatorIndex) => {
    a = operation[operatorIndex  - 1]
    for (let y = operatorIndex - 2; y >= 0; y--) {
        let element = operation[y];
        if (Number(element) || element == '0' || element == '.') {
            a += element
        }
        else {
            a = reverseString(a)
            if (element == '-' && !operation[y-1]) {
                a = -a
            }
            return a
        }
    }

    return reverseString(a)
}

// Find the right side of the operation
const findOperationNumberAfter = (operation, operatorIndex) => {
    let b = operation[operatorIndex + 1]

    for (let y = operatorIndex + 2; y < operation.length; y++) {
        const element = operation[y];
        if (Number(element) || element == '0' || element == '.') {
            b += element
        }
        else {
            return b
        }
    }
    return b
}


// Reverse string for numbers
const reverseString = (str) => {
    return str.split("").reverse().join("");
}

// Find the index of the operator
const findOperatorIndex = (operation, parentheseIndex) => {
    for (let i = parentheseIndex + 1; i < operation.length - 1; i++) {
        if (isAnOperator(operation, i)) {
            return i
        }
    }
}

const isAnOperator = (operation, index) => {
    if (operation[index] == '+' || operation[index] == '-' || operation[index] == '*' || operation[index] == '/') {
        return true
    }
    else {
        return false
    }
}
