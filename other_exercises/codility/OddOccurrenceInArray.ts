// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A: number[]): number {
  // Implement your solution here
  const paired: {
    [myNum: number]: boolean;
  } = {};
  for (let i = 0; i < A.length; i++) {
    if (!paired[A[i]]) {
      paired[A[i]] = true;
    } else {
      delete paired[A[i]];
    }
  }
  return Number(Object.keys(paired)[0]);
}
