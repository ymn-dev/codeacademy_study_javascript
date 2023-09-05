/*
1.Write a program that finds the largest number in an array.
You are given an array of integers. Write a program that finds the largest number in the array and returns it. The program should take the array as an input and output the largest number.
For example, if the array is [4, 6, 8, 2, 10], the program should output 10 as it is the largest number in the array. Make sure your program works for arrays of any size and contains only positive integers.
2.Write a program that finds the second-largest number in an array.
Continuing from the previous question, now you need to find the second-largest number in the same array.
*/
const myArray = [];
const maxSize = 20; //setting max array size
const arraySize = Math.round(Math.random() * maxSize); //random array size

const maxNumberInArray = 100; //setting max number in array

// console.log(arraySize);

//generating only positive numbers into array
let biggestNumberInArray = -1; //-1 because array of positive number
let secondBiggestNumberInArray = -1;

for (let i = 0; i < arraySize; i++) {
  const valueToPush = Math.round(Math.random() * maxNumberInArray);
  myArray.push(valueToPush);

  //finding biggest number
  if (valueToPush > biggestNumberInArray) {
    //updating value before change biggest number
    secondBiggestNumberInArray = biggestNumberInArray;
    biggestNumberInArray = valueToPush;
  } else if (valueToPush < biggestNumberInArray && valueToPush > secondBiggestNumberInArray) {
    //gotta update still even if new value not higher than the biggest one
    secondBiggestNumberInArray = valueToPush;
  }
}
console.log("Array value = " + myArray);
console.log("biggest number = " + biggestNumberInArray);
console.log("second biggest number = " + secondBiggestNumberInArray);
