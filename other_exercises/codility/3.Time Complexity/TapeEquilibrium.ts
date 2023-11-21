//https://app.codility.com/programmers/lessons/3-time_complexity/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function TapeEquilibrium(A: number[]): number {
  // Implement your solution here
  let minDiff: number = Infinity;
  let secondHalf: number = A.reduce((sum, acc) => {
    return (sum += acc);
  }, 0);
  let firstHalf: number = A[0];
  for (let i: number = 1; i < A.length; i++) {
    secondHalf -= A[i - 1];
    const difference: number = Math.abs(firstHalf - secondHalf);
    if (difference < minDiff) minDiff = difference;
    firstHalf += A[i];
  }
  return minDiff;
}
