//https://app.codility.com/programmers/lessons/6-sorting/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function Triangle(A: number[]): number {
  // Implement your solution here
  const sortedArray = A.sort((a, b) => {
    return a - b;
  });
  let triangleFound = false;
  for (let i = 0; i < A.length - 2; i++) {
    const line1 = sortedArray[i];
    const line2 = sortedArray[i + 1];
    const line3 = sortedArray[i + 2];
    if (line1 + line2 > line3 && line1 + line3 > line2 && line2 + line3 > line1) {
      triangleFound = true;
      break;
    }
  }
  return triangleFound ? 1 : 0;
}
