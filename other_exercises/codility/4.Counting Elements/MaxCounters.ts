//https://app.codility.com/programmers/lessons/4-counting_elements/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function MaxCounters(N: number, A: number[]): number[] {
  // Implement your solution here
  const maxCounter = N + 1;
  let previousMaxUpdate: number = 0;
  let highestCount: number = 0;
  let resultArray: number[] = Array(N).fill(0);
  for (let i: number = 0; i < A.length; i++) {
    if (A[i] === maxCounter) {
      previousMaxUpdate = highestCount;
    } else {
      //check if the value havent updated before increase
      if (resultArray[A[i] - 1] < previousMaxUpdate) {
        resultArray[A[i] - 1] = previousMaxUpdate;
      }
      resultArray[A[i] - 1]++;
      if (resultArray[A[i] - 1] > highestCount) highestCount = resultArray[A[i] - 1];
    }
  }
  //update value that didnt get call later
  for (let i: number = 0; i < N; i++) {
    if (resultArray[i] < previousMaxUpdate) {
      resultArray[i] = previousMaxUpdate;
    }
  }

  return resultArray;
}
