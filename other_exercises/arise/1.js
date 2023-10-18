/* 
+0-0 +0-0 +0-0 +0-0 +0-0
+0-0 +0-0
0 %0  
*/
const operator = (num) => {
  if (num % 4 === 0) {
    //+
    return 1;
  } else if (num % 4 === 1 || num % 4 === 3) {
    //0,0
    return 0;
  } else if (num % 4 === 2) {
    //-
    return -1;
  }
};
const myFunction = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    const myOperator = operator(i);
    let num = Math.abs(arr[i]);
    if (myOperator === 1 || myOperator === -1) {
      if (arr[i] === 0) return -1;
      if (myOperator === -1) num *= -1;
      sum += num;
    } else if (myOperator === 0 || myOperator === 0) {
      continue;
    }
  }
  return sum;
};

console.log(myFunction([1, 2, 3, 4, 5]));
