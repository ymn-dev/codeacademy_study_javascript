const symbol = ["I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD", "D", "CM", "M"];
const value = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
/*
IV IX XL XC MCDXLIX
4  5  40 90  1449 
*/

const romanToNum = (str) => {
  let num = 0;
  for (let i = 0; i < str.length - 1; i++) {
    let pointer2 = i + 1;
    let index = symbol.indexOf(str[i] + str[pointer2]);
    if (index > -1) {
      num += value[index];
      i++;
    } else {
      index = symbol.indexOf(str[i]);
      num += value[index];
    }
  }
  return num;
};
console.log(romanToNum("MCDXLIX"));

const numToRoman = (num) => {
  const romanNumber = [];
  let Num = num;
  for (let i = symbol.length; i >= 0; i--) {
    while (Num - value[i] >= 0) {
      romanNumber.push(symbol[i]);
      Num -= value[i];
    }
  }
  return romanNumber.join("");
};

console.log(numToRoman(1449));
