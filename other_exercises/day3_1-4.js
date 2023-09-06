/*
1.Given an array of numbers, write a program that reverses the order of the elements in the array
> Could you try it without .reverse()?
2.Given a string, write a program to reverse the order of characters in the string. For example, if the input is "hello", the output should be "olleh".
> Could you try it without .reverse()?
3. Given two strings, write a program to check if they are anagrams of each other. Your program should return True if the two strings are anagrams and False otherwise.
> An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once. For example, "listen" and "silent" are anagrams of each other.
> Tips: ลองเปิดอ่านพวก Hash Table หรือการใช้งาน JSON Object เพื่อใช้เป็น Local Database ฝากเอาไว้ก่อน
4. Given a string, write a program that checks if it is a palindrome. Return True if it is and False otherwise.
> A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward. For example, "racecar" is a palindrome, while "hello" is not.
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
  console.log(returnArray);
  return returnArray;
};

const arraySwapper = (Arr) => {
  let wasString = false;
  if (typeof Arr === "string") {
    Arr = Arr.split(""); //split so it's array of character
    wasString = true; //the type changed to array so we have to keep this
  }
  let howManyTimes;
  //given array [0 1 2 3 4 5] => [5 4 3 2 1 0] 6 numbers, we get a match, swapping 6/2 times
  //given array [0 1 2 3 4] => [4 3 2 1 0] 5 numbers, we have one leftover, swapping 5-1/2 times
  if (Arr.length % 2 === 0) {
    howManyTimes = Arr.length / 2;
  } else {
    howManyTimes = (Arr.length - 1) / 2;
  }
  if (Arr.length === 1) {
    console.log(`what are you even swapping`);
    return Arr;
  }
  for (let i = 0; i < howManyTimes; i++) {
    [Arr[i], Arr[Arr.length - 1 - i]] = [Arr[Arr.length - 1 - i], Arr[i]];
  }

  if (wasString) Arr = Arr.join("");
  console.log(Arr);
};

const myArray = numberArrayGenerating(7, 15);
arraySwapper(myArray);

const testString = "hello"; //well, technically it's array of character
console.log(testString);
arraySwapper(testString);
