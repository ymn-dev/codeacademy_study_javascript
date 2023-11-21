//https://app.codility.com/programmers/lessons/4-counting_elements/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function PermCheck(A: number[]): number {
  // Implement your solution here
  const checker: boolean[] = Array(A.length).fill(false);
  for (let i: number = 0; i < A.length; i++) {
    if (checker[A[i] - 1] || A[i] > A.length) return 0;
    if (!checker[A[i] - 1]) checker[A[i] - 1] = true;
  }
  return 1;
}
