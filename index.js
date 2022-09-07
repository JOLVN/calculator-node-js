const calculateOperation = require('./calculateOperation')

// Requires readline module and creates its interface
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});


// Ask a question and read the answer
const question = () => {
    readline.question(`Give an operation to calculate : `, (operation) => {

        // Get and display the result in the console
        const result = calculateOperation(operation)

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


