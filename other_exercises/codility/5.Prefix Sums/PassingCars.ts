//https://app.codility.com/programmers/lessons/5-prefix_sums/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function PassingCars(A: number[]): number {
  // Implement your solution here
  let passingPair: number = 0;
  let goWest: number = 0;
  for (let i = 0; i < A.length; i++) {
    if (A[i] == 0) {
      goWest++;
    }
    if (A[i] == 1) {
      passingPair += goWest;
    }
  }
  return passingPair > 1000000000 ? -1 : passingPair;
}
