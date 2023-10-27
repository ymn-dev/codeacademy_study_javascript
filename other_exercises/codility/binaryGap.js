// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');
/*
A binary gap within a positive integer N is any maximal sequence of consecutive zeros that is surrounded by ones at both ends in the binary representation of N.

For example, number 9 has binary representation 1001 and contains a binary gap of length 2. The number 529 has binary representation 1000010001 and contains two binary gaps: one of length 4 and one of length 3. The number 20 has binary representation 10100 and contains one binary gap of length 1. The number 15 has binary representation 1111 and has no binary gaps. The number 32 has binary representation 100000 and has no binary gaps.

Write a function:

function solution(N);

that, given a positive integer N, returns the length of its longest binary gap. The function should return 0 if N doesn't contain a binary gap.

For example, given N = 1041 the function should return 5, because N has binary representation 10000010001 and so its longest binary gap is of length 5. Given N = 32 the function should return 0, because N has binary representation '100000' and thus no binary gaps.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [1..2,147,483,647].
*/

function solution(N) {
  // Implement your solution here
  const binaryString = Array.from(N.toString(2));
  let counter = 0;
  let maxCounter = 0;
  let maxValidCounter = 0;
  for (let i = 0; i < binaryString.length; i++) {
    if (binaryString[i] == 0) {
      counter++;
      if (counter > maxCounter) {
        maxCounter = counter;
      }
    } else if (binaryString[i] == 1) {
      maxValidCounter = maxCounter;
      counter = 0;
    }
  }

  return maxValidCounter;
}

const numToBinary = (num) => {
  if (num === 0) {
    return 0;
  }
  let binaryString = "";
  while (num > 0) {
    const remainder = num % 2;
    binaryString = remainder + binaryString;
    num = Math.floor(num / 2);
  }
  return binaryString;
};
