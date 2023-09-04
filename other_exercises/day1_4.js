/*
4.Write a program to find if the array is sorted.
You are given an array of integers. Write a program that checks if the array is sorted in non-decreasing order, which means that each element in the array is greater than or equal to the previous element. Your program should return true if the array is sorted and false otherwise.
*/
const myArray = [];
const maxSize = 10; //setting max array size
const arraySize = Math.round(Math.random() * maxSize); //random array size

const maxNumberInArray = 100; //setting max number in array
for (let i = 0; i < arraySize; i++) {
  //setting array length from -maxNumberInArray to maxNumberInArray
  const valueToPush = Math.round(Math.random() * (2 * maxNumberInArray) - maxNumberInArray);
  myArray.push(valueToPush);
}

const isSorted = (arr) => {
  let previous = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (previous > arr[i]) return false;
    previous = arr[i];
  }
  return true;
};

console.log(myArray);
console.log(isSorted(myArray));
