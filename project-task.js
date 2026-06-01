/*
Scenario:
You’ve been hired to help a local pet shelter digitize its animal adoption records. The program is meant to:
  
  Allow users to enter an animal type and adoption fee.
  
  Add the animal and fee to a list.
  
  Retrieve the adoption fee for a specific animal when requested.

However, the initial developer left the program in a buggy state, with missing exception-handling logic
and some errors in the implementation. Your job is to fix it!



Instructions
Start by Understanding the Errors:
Run the program and observe the exceptions that occur. Document what the exceptions are and where they happen.
Error observed : ReferenceError: prompt is not defined
                 Logic Error : Empty animal name is accepted,does not properly blocks empty strings
                 logic error : Empty fee becomes $0
                 Non‑numeric fee becomes NaN and is not caught
                 No try/catch around user actions
Write Exception Handling Code:
Use try/catch blocks to handle the errors so the program doesn’t crash when incorrect input or unexpected situations occur.

Test and Debug:
Test the program with valid and invalid inputs to confirm that exceptions are handled gracefully
and the program continues running as intended.

*/

// Will need to import / install readline-sync if not done so already within project dir: npm install readline-sync 
const readlineSync = require('readline-sync');

// Initial Code with Bugs (modified to use readline-sync)
let animals = [];
let fees = [];

//Add animal with validation
function addAnimal(name, fee) {
    if (!name || typeof name !== "string") {
        throw new Error("Animal name cannot be empty.");
    }
    if (isNaN(fee) || fee < 0) {
        throw new Error("Adoption fee must be a non-negative number.");
    }

    animals.push(name);
    fees.push(fee);
}
//Retrive adoption fee

function getAdoptionFee(animalName) {
    let index = animals.indexOf(animalName);
    if (index === -1) {
        throw new Error("Animal not found in records!");
    }
    return fees[index];
}

// Main program
console.log("Welcome to the Pet Shelter System");

while (true) {
    let action = readlineSync.question("Choose an action: 'add', 'fee', or 'exit': ").toLowerCase();

    if (action === "exit") {
        console.log("Goodbye!");
        break;
    }

    if (action === "add") {
        try {
            let animal = readlineSync.question("Enter the animal's name: ").trim();
            let feeInput = readlineSync.question("Enter the adoption fee: ").trim();
           if (feeInput === "") {
    throw new Error("Adoption fee cannot be empty.");
}
            let fee = Number(feeInput);

            if (isNaN(fee)) {
                throw new Error("Adoption fee must be a number.");
            }

            addAnimal(animal, fee);
            console.log(`${animal} added with a fee of $${fee}.`);
        } catch (error) {
            console.log("Error:", error.message);
        }

    } else if (action === "fee") {
        try {
            let animal = readlineSync.question("Enter the animal's name to find its adoption fee: ").trim();
            let fee = getAdoptionFee(animal);
            console.log(`${animal}'s adoption fee is $${fee}.`);
        } catch (error) {
            console.log("Error:", error.message);
        }

    } else {
        console.log("Invalid action. Please choose 'add', 'fee', or 'exit'.");
    }
}

/*Different values tested and Output is
$ node project-task.js 
Welcome to the Pet Shelter System
Choose an action: 'add', 'fee', or 'exit': add
Enter the animal's name: dog
Enter the adoption fee:
Error: Adoption fee cannot be empty.
Choose an action: 'add', 'fee', or 'exit': add
Enter the animal's name: cat
Enter the adoption fee: -50
Error: Adoption fee must be a non-negative number.
Choose an action: 'add', 'fee', or 'exit': exit
Goodbye!
*/