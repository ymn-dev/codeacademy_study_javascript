const order = ["I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD", "D", "CM", "M"];
const value = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
/*
IV IX XL XC
4  5  40 90
*/

const numToRoman = (num) => {
  const romanNumber = [];
  let Num = num;
  for (let i = order.length; i >= 0; i--) {
    while (Num - value[i] >= 0) {
      romanNumber.push(order[i]);
      Num -= value[i];
    }
  }
  return romanNumber.join("");
};

console.log(numToRoman(1449));
