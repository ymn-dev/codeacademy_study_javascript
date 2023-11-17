// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function MinAvgTwoSlice(A: number[]): number {
  // Implement your solution here
  let startingPosition = 0;
  /* math stuffs:
  since slice of 4 is made of 2+2 and 5 is made of 2+3 and so on 
  you only need to check 2/3 because they cant be lower than 2/3 (equal at best)
  */
  const sliceOfTwo: number[] = [];
  const sliceOfThree: number[] = [];
  let minValue = Infinity;
  for (let i = 0; i < A.length - 1; i++) {
    sliceOfTwo[i] = (A[i] + A[i + 1]) / 2;
    let currentValue = sliceOfTwo[i];
    if (currentValue < minValue) {
      minValue = currentValue;
      startingPosition = i;
    }

    let j = i + 2;
    if (j > A.length - 1) continue;
    sliceOfThree[i] = (A[i] + A[i + 1] + A[j]) / 3;
    currentValue = sliceOfThree[i];
    if (currentValue < minValue) {
      minValue = currentValue;
      startingPosition = i;
    }
  }

  return startingPosition;
}
