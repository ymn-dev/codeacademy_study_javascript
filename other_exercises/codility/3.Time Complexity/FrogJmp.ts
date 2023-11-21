//https://app.codility.com/programmers/lessons/3-time_complexity/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function FrogJmp(X: number, Y: number, D: number): number {
  // Implement your solution here
  if (X > Y) return 0;
  return Math.ceil((Y - X) / D);
}
