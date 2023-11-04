function FrogJmp(X: number, Y: number, D: number): number {
  // Implement your solution here
  if (X > Y) return 0;
  return Math.ceil((Y - X) / D);
}
