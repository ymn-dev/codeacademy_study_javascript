//https://app.codility.com/programmers/lessons/2-arrays/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A, K) {
  // Implement your solution here
  if (K === A.length || A.length === 0) return A;
  for (let i = 0; i < K % A.length; i++) {
    const data = A.pop();
    A.unshift(data);
  }
  return A;
}
