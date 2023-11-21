//https://app.codility.com/programmers/lessons/4-counting_elements/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function MissingInteger(A: number[]): number {
  // Implement your solution here
  let min = 1;
  interface Checker {
    [myNum: number]: boolean;
  }
  let checker: Checker = {};
  for (let i: number = 0; i < A.length; i++) {
    if (A[i] < 1) continue;
    if (checker[A[i]]) {
      continue;
    } else {
      checker[A[i]] = true;
    }
  }
  while (checker[min] === true) {
    min++;
  }
  return min;
}
