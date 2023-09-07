/*
1.Write a program that finds the missing numbers in an array of integers with a length of N and all integers from 1 to N present except for K missing integers. The program should return a list of the missing integers in ascending order.
  a) Example 1:
    i ) Input: [1,2,3,3] length = 4 Missing Number is 4
    ii) Output: [4]
  b) Example 2:
    i ) Input: [3,3,1,3] length = 4 Missing Number is 2,4
    ii) Output: [2,4]
2.Given two arrays, write a program that checks if they contain any duplicate elements. If duplicates are found, return True, otherwise return False.
3.Given two arrays, write a program to find the intersection of the two arrays. The intersection is the set of elements that are common to both arrays. For example, if the two arrays are [1, 2, 3, 4, 5] and [3, 4, 5, 6, 7], the intersection is [3, 4, 5].
*/

const numberArrayGenerating = (maxSize, maxValue, onlyPositive = true) => {
  const arraySize = Math.round(Math.random() * maxSize);
  const returnArray = [];
  for (let i = 0; i < arraySize; i++) {
    let valueToPush;
    if (onlyPositive) {
      valueToPush = Math.round(Math.random() * maxValue);
    } else {
      valueToPush = Math.round(Math.random() * (2 * maxValue) - maxValue);
    }
    returnArray.push(valueToPush);
  }
  return returnArray;
};

//1
const findMissing1toN = (numArr) => {
  let missingList = Array.from(numArr, (value, index) => (value = index + 1));
  missingList = missingList.filter((number) => {
    if (numArr.indexOf(number) === -1) return true;
  });
  return missingList;
};

const numArray = numberArrayGenerating(7, 10);
console.log(`array = ${numArray} length = ${numArray.length}`);
console.log(`missing number = ${findMissing1toN(numArray)}`);

//2,3
const findIntersection = (arr1, arr2) => {
  let intersection = [];
  intersection = arr1.filter((item) => {
    for (let i = 0; i < arr2.length; i++) {
      if (item === arr2[i]) return true;
    }
  });
  if (intersection.length === 0) {
    return [false, []];
  } else {
    return [true, intersection];
  }
};
const numArray2 = numberArrayGenerating(7, 10);
const numArray3 = numberArrayGenerating(3, 10);
console.log(`array 1 = ${numArray2}`);
console.log(`array 2 = ${numArray3}`);

//2
console.log(`has duplicated? ${findIntersection(numArray2, numArray3)[0]}`);
//3
console.log(`intersection between two array: 
${JSON.stringify(findIntersection(numArray2, numArray3)[1])}`);
