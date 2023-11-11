// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function MaxCounters(N: number, A: number[]): number[] {
  // Implement your solution here
  const maxCounter = N + 1;
  let highestCount: number = 0;
  let resultArray: number[] = Array(N).fill(0);
  for (let i: number = 0; i < A.length; i++) {
    if (A[i] === maxCounter) {
      resultArray = Array(N).fill(highestCount);
    } else {
      resultArray[A[i] - 1]++;
      if (resultArray[A[i] - 1] > highestCount) highestCount = resultArray[A[i] - 1];
    }
  }
  return resultArray;
}
