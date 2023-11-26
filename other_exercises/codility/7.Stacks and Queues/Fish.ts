//https://app.codility.com/programmers/lessons/7-stacks_and_queues/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function Fish(A: number[], B: number[]): number {
  // Implement your solution here
  let survivingFishes = 0;
  const fishGoingDownstream: number[] = [];
  for (let i = 0; i < B.length; i++) {
    if (B[i] === 1) {
      fishGoingDownstream.push(A[i]);
    }
    if (B[i] === 0) {
      if (fishGoingDownstream.length < 1) {
        survivingFishes++;
        continue;
      }
      let currentFishAlive = true;
      while (fishGoingDownstream.length > 0) {
        const enemySize: number = fishGoingDownstream.pop()!;
        if (A[i] < enemySize) {
          fishGoingDownstream.push(enemySize);
          currentFishAlive = false;
          break;
        }
        if (A[i] > enemySize) continue;
      }
      if (currentFishAlive) survivingFishes++;
    }
  }
  survivingFishes += fishGoingDownstream.length;
  return survivingFishes;
}
