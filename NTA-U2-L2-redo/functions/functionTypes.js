

// DRY Principle - Don't repeat yourself
// greetingFunction() // Call the Function
// greetingFunction2("Jane","Smith") // Call the Function with parameters
let greeting = greetingFunction3("Jane","Smith") // Call the Function with parameters

console.log(greeting);

function greetingFunction3(firstName, lastName) { // Function with parameters and return a value

    let greeting = "Hello " + firstName + " " + lastName;

    return greeting;
}

function greetingFunction2(firstName, lastName) { // Function with parameters 

    let greeting = "Hello " + firstName + " " + lastName;

    console.log(greeting);
}

function greetingFunction() { // Function with no parameters

    let firstName = "Carlos";
    let lastName = "Zegarra";

    let greeting = "Hello " + firstName + " " + lastName;

    console.log(greeting);
}





