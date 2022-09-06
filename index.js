/**
 * Run with "node index.js" once you are in this folder
 */

const { openStdin } = require('process');


// Requires readline module and creates its interface
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});


// Ask a question and read the answer
const question = () => {

    readline.question(`Give an operation to calculate : `, (operation) => {

        // Get and displas the result in the console
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



const reverseString = (str) => {
    return str.split("").reverse().join("");
}

const findOperationNumberBefore = (operation, operatorIndex) => {
    let a = operation[operatorIndex - 1]

    for (let y = operatorIndex - 2; y >= 0; y--) {
        let element = operation[y];
        if (Number(element) || element == '0') {
            a += element
        }
        else {
            return reverseString(a)
        }
    }
    return reverseString(a)
}


const findOperationNumberAfter = (operation, operatorIndex) => {
    let b = operation[operatorIndex + 1]

    for (let y = operatorIndex + 2; y < operation.length; y++) {
        const element = operation[y];
        if (Number(element) || element == '0') {
            b += element
        }
        else {
            return b
        }
    }
    return b
}

const calculOperation = (operation) => {
    
    let result = null
    
    // Remove spaces
    operation = operation.replace(/\s+/g, '')

    let a = 0
    let b = 0
    let operator = ''
    for (let i = 0; i < operation.length; i++) {
        let element = operation[i]
        
        // If element is a number -> change its type to 'number'
        if (Number(element) || element == 0) {
            element = Number(element)
        }

        // Operator or parenthese
        else {
            a = findOperationNumberBefore(operation, i)
            b = findOperationNumberAfter(operation, i)
            operator = element

            // Check if there is a prioritory operator
            for (let y = 0; y < operation.length; y++) {
                if (operation[y] == '*' || operation[y] == '/') {
                    a = findOperationNumberBefore(operation, y)
                    b = findOperationNumberAfter(operation, y)
                    operator = operation[y]
                    result = calculateOperation(a, b, operator)
                }
            }

            // Calculate operation if there was no priority operator
            if (!result) {
                result = calculateOperation(a, b, operator)
            }

            // Check if there is more calcul to make
            if (operation.length > (a.length + b.length + 1)) {
                const stringToReplace = a + operator + b
                const newOperation = operation.replace(stringToReplace, result)
                
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

// Calculate to numbers about they operator
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


