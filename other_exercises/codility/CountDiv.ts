// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function CountDiv(A: number, B: number, K: number): number {
  // Implement your solution here
  const maxDivisible: number = Math.floor(B / K);
  const skipped: number = Math.floor(A / K);
  //if the starting point mod K === 0 we need to +1
  return A % K === 0 ? maxDivisible - skipped + 1 : maxDivisible - skipped;
}
