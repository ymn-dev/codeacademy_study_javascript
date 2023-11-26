//https://app.codility.com/programmers/lessons/7-stacks_and_queues/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function Nesting(S: string): number {
  // Implement your solution here
  let checkStack: string[] = [];
  for (const char of S) {
    if (char === "(") checkStack.push(char);
    else if (char === ")") {
      if (checkStack.pop() + char === "()") continue;
      else return 0;
    } else return 0;
  }

  return Number(checkStack.length < 1);
}
