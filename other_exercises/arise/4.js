/*pw validation
 Assume ว่า password เป็นตัวเลขล้วน
1.password ต้องมากกว่าหกตัวอักษร
2.password ต้องไม่ซ้ำกันติดกันสามตัวขึ้นไป เช่น 12223445 แบบนี้ไม่ได้
3.password ต้องไม่ซ้ำกัน สองตัวเป็นจำนวนสามชุด ติดกันขึ้นไป เช่น 12233445555555 แบบนี้ไม่ได้
4.password ต้องไม่ increase หรือ decrease สามตัวติดกันขึ้นไป เช่น 123456 456333 543321 แบบนี้ไม่ได้
*/

const validator = (password) => {
  if (isNaN(Number(password))) return false;
  const stringPassword = typeof password === "string" ? password : String(password);
  if (stringPassword.length < 6) return false;
  const passwordArray = Array.from(stringPassword);
  let previousNumber = Number(passwordArray[0]);
  let repeatCount = 1;
  let repeatNearPairsCount = 0;
  let differenceCount = 0;
  let plus1increase = 1;
  let minus1decrease = 1;
  for (let i = 1; i < passwordArray.length; i++) {
    let currentNumber = Number(passwordArray[i]);

    if (currentNumber > previousNumber) {
      differenceCount++;
      repeatCount = 1;
      if (currentNumber - 1 === previousNumber) plus1increase++;
      if (differenceCount === 2) repeatNearPairsCount = 0;
    } else if (currentNumber === previousNumber) {
      repeatCount++;
      repeatNearPairsCount++;
      differenceCount = 0;
      plus1increase = 1;
      minus1decrease = 1;
    } else if (currentNumber < previousNumber) {
      differenceCount++;
      repeatCount = 1;
      if (currentNumber + 1 === previousNumber) minus1decrease++;
      if (differenceCount === 2) repeatNearPairsCount = 0;
    }

    if (repeatCount === 3 || repeatNearPairsCount === 3 || plus1increase === 3 || minus1decrease === 3) {
      console.log(`password ${password}`);
      if (repeatCount === 3) console.log(`repeatCount`);
      if (repeatNearPairsCount === 3) console.log(`repeatNearPairsCount`);
      if (plus1increase === 3) console.log(`plus1increase`);
      if (minus1decrease === 3) console.log(`minus1decrease`);
      return false;
    }
    previousNumber = currentNumber;
  }
  return true;
};

console.log(validator(12223445));
console.log(validator(122334455));
console.log(validator(123456));
console.log(validator(543321));
