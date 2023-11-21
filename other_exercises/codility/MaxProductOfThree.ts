// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function MaxProductOfThree(A: number[]): number {
  // Implement your solution here
  const sortedArray = A.sort((a, b) => {
    return a - b;
  });
  const lowestTwoMinuses = sortedArray[0] * sortedArray[1];
  const twoBeforeLast = sortedArray[A.length - 2] * sortedArray[A.length - 3];
  const lastValue = sortedArray[A.length - 1];
  //handling minus values
  if (lowestTwoMinuses > twoBeforeLast) {
    return lastValue >= 0 ? lowestTwoMinuses * lastValue : twoBeforeLast * lastValue;
  }
  return twoBeforeLast * lastValue;
}
