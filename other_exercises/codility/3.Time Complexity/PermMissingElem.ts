//https://app.codility.com/programmers/lessons/3-time_complexity/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function PermMissingElem(A: number[]): number {
  // Implement your solution here
  let total = A.length + 1;
  for (let i: number = 0; i < A.length; i++) {
    total += i + 1;
    total -= A[i];
  }
  return total;
}
