/**
 * Run with "node index.js" once you are in this folder
 */


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


const calculOperation = (operation) => {

    let result = null
    
    // Split simple "A [+, -, *, /] B" operation with operator
    const splitedOperation = operation.split(/([\+\-\*\/])/, 3)

    // Get splited elements from operation
    const a = parseInt(splitedOperation[0])
    const b = parseInt(splitedOperation[2])
    const operator = splitedOperation[1]

    // Calcul
    switch (operator) {
        case '+':
            result = a + b
            break;
        case '-':
            result = a - b
            break;
        case '*':
            result = a * b
            break;
        case '/':
            result = a / b
            break;
    }

    // Return the result
    return result

}
