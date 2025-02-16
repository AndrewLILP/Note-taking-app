
let a = 4;
let b = 7;

let arr = [4,5,7,8,9,2,3,4,6];

// array methods

arr.push(100); // method - adds an element to the end
console.log(arr);

arr.pop(); // removes the last element
console.log(arr);

console.log(arr.length); // length property

let first = arr.shift(); // removes the first element
console.log(first);
console.log(arr);

arr.unshift(200); // adds an element at the beginning 
console.log(arr);