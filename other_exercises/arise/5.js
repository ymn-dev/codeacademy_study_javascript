/*
sum odd/even numbers
if found "<" take left side value
if found ">" take right side value
*/

const myFunction = (strArr) => {
  console.log(`array ${strArr}`);
  let sumOdd = 0;
  let sumEven = 0;
  for (let i = 0; i < strArr.length; i++) {
    if (isNaN(strArr[i])) {
      if (strArr[i] === "<") {
        strArr[i] = strArr[i - 1];
      }
      if (strArr[i] === ">") {
        let j = 1;
        while (i + j < strArr.length) {
          if (strArr[i + j] === ">") j++;
          if (!isNaN(strArr[i + j])) {
            strArr[i] = strArr[i + j];
            break;
          }
        }
      }
    }
    let currentNumber = Number(strArr[i]);

    if (currentNumber % 2 === 0) sumEven += currentNumber;
    if (currentNumber % 2 === 1) sumOdd += currentNumber;
  }
  console.log(`sumOdd = ${sumOdd}, sumEven = ${sumEven}`);
};

// inputs
myFunction(["1", "2", "3", "4", "5", "14", "32", "77", "91"]);
myFunction(["1", "2", "3", "4", "5", "<", "32", "<", "7"]);
myFunction(["1", "2", "3", "4", "5", ">", "32", ">", "7"]);
myFunction(["1", "2", "<", "4", "5", "<", "32", ">", "7"]);
myFunction(["1", "2", "<", "<", "5", "<", "6", ">", ">", "7"]);
