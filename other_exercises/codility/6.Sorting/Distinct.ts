//https://app.codility.com/programmers/lessons/6-sorting/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function Distinct(A: number[]): number {
  // Implement your solution here
  let distinctCount = 0;
  interface Checker {
    [FoundNum: number]: boolean;
  }
  const checker: Checker = {};
  for (let i = 0; i < A.length; i++) {
    if (!(A[i] in checker)) {
      checker[A[i]] = true;
      distinctCount++;
    }
  }
  return distinctCount;
}
