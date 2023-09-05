/*
Given an array, write a program to:
> find the sum of all numbers in the array.
> find the average of all numbers in the array.
> find the median of the array.
*/

const myArray = [];
const maxSize = 7; //setting max array size
const arraySize = Math.round(Math.random() * maxSize); //random array size

const maxNumberInArray = 10; //setting max number in array

let sum = 0;
for (let i = 0; i < arraySize; i++) {
  //setting array length from -maxNumberInArray to maxNumberInArray
  const valueToPush = Math.round(Math.random() * (2 * maxNumberInArray) - maxNumberInArray);
  sum += valueToPush;
  myArray.push(valueToPush);
}

console.log(myArray);
console.log(`Sum = ${sum}, Average = ${sum / arraySize}`);

//sorting array
for (let i = 0; i < arraySize; i++) {
  // const valueAtI = myArray[i];
  for (let j = i; j < arraySize; j++) {
    // const valueAtJ = myArray[j];
    //if value at J (which is always after value at I) is less than value at I...
    if (myArray[j] < myArray[i]) {
      //swap position J with I using array destructuring so I dont need temp to store value
      [myArray[i], myArray[j]] = [myArray[j], myArray[i]];
    }
  }
}
console.log(`sorted array = ${myArray}`);

//finding median for odd/even number
if (myArray.length % 2 === 0) {
  console.log(`median is ${(myArray[arraySize / 2] + myArray[arraySize / 2 - 1]) / 2}`);
} else {
  console.log(`median is ${myArray[(arraySize - 1) / 2]}`);
}
