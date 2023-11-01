// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

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

const numToBinary = (num, base = 2) => {
  if (num === 0) {
    return "0";
  }
  let binaryString = "";
  /*
  in any base (<=10 else will need a value table), not just binary we will look at it digit by digit
  sample like 1234567, its easier to just get the last value using %
  1. we get that last value in the <base number> you want to convert <% base> and store it
  2. we then completely remove the last digit from calculation <floored /base> then repeat 1.
  */
  while (num > 0) {
    const remainder = num % base;
    binaryString = remainder + binaryString;
    num = Math.floor(num / base);
  }
  return binaryString;
};

const binaryToNum = (binaryStr) => {
  let num = 0;
  let power = 0;
  for (let i = binaryStr.length - 1; i >= 0; i--) {
    num += binaryStr[i] * 2 ** power;
    power++;
  }
  return num;
};
