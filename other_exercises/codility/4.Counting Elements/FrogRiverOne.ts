//https://app.codility.com/programmers/lessons/4-counting_elements/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function FrogRiverOne(X: number, A: number[]): number {
  // Implement your solution here
  let earliestTime: number = -1;
  interface leafPosition {
    [position: number]: boolean;
  }
  let count: number = 0;
  const leavesPositions: leafPosition = {};
  if (A.length < X) return -1;
  for (let i: number = 0; i < A.length; i++) {
    if (A[i] in leavesPositions) {
      continue;
    } else {
      leavesPositions[A[i]] = true;
      count++;
    }
    if (count === X) {
      earliestTime = i;
      break;
    }
  }
  return earliestTime;
}
