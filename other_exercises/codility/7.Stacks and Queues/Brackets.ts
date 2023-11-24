//https://app.codility.com/programmers/lessons/7-stacks_and_queues/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function Brackets(S: string): number {
  // Implement your solution here
  const checkerStack: string[] = [];
  const arrayS = Array.from(S);
  for (let i = 0; i < arrayS.length; i++) {
    let bracket = arrayS[i];
    if (bracket === "{" || bracket === "[" || bracket === "(") {
      checkerStack.push(bracket);
    } else if (bracket === "}" || bracket === "]" || bracket === ")") {
      const checkPair = checkerStack.pop() + bracket;
      if (checkPair !== "{}" && checkPair !== "[]" && checkPair !== "()") return 0;
    } else {
      return 0;
    }
  }
  return checkerStack.length === 0 ? 1 : 0;
}
