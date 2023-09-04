/*
3.Divisibility by 3 with Suffix 5.
Write a program that generates an output array from range of number 1-100 if the number's suffix is 5 and the number is fully divisible by 3
*/
const myArray = [];
for (let i = 0; i <= 100; i++) {
  if (i % 10 === 5 && i % 3 === 0) myArray.push(i);
}
console.log(myArray);
