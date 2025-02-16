

// DRY - Don't repeat yourself
// greetingFunction() // Call the Function
// greetingFunction2("Jane","Smith") // Call the Function with parameters
//let greeting = greetingFunction3("Jane","Smith") // Call the Function with parameters

//console.log(greeting);



let greetingFunction3 = (firstName, lastName) => { // Function with parameters and return a value - Arrow Function

    let greeting = "Hello " + firstName + " " + lastName;

    return greeting;
}

let greetingFunction2 = (firstName, lastName) => { // Function with parameters - Arrow Function

    let greeting = "Hello " + firstName + " " + lastName;

    console.log(greeting);
}

let greetingFunction = () => { // Arrow function

    let firstName = "Carlos";
    let lastName = "Zegarra";

    let greeting = "Hello " + firstName + " " + lastName;

    console.log(greeting);
}

/*
let variable_name = (parameters) => {
    //body
}
*/  

/*
function sum(a,b){
    return a + b;
}*/

let sum = (a,b) => a + b;



greetingFunction();
greetingFunction2("Jane","Smith")
let greeting = greetingFunction3("Jane","Smith")
console.log(greeting);

let su = sum(4,7);
console.log(su);




