// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function CountDiv(A: number, B: number, K: number): number {
  // Implement your solution here
  let divisibleCount: number = 0;
  let startValue: number = A;
  let startValueFound: boolean = false;
  let endValue: number = B;
  let endValueFound: boolean = false;
  for (let i = 0; i < K; i++) {
    if (startValue % K === 0) startValueFound = true;
    if (!startValueFound) startValue++;
    if (endValue % K === 0) endValueFound = true;
    if (!endValueFound) endValue--;
    if (startValueFound && endValueFound) break;
  }
  divisibleCount = endValue / K - startValue / K + 1;
  return divisibleCount;
}
