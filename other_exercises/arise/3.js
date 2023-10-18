/*
given input a,b, both are numbers, return a "lovely number" where
A and B is a range of all numbers: if A = 0 B = 100, then we will work with 0-100
count lovely numbers which is defined as:
a number with no more than 3 repetitive of any numbers: not 111, not 110101
eg: 1-111 return 110 because 111 isnt
*/

const myFunction = (A, B) => {
  let sum = 0;
  for (let i = A; i <= B; i++) {
    let flag = false;
    const counter = {};
    for (let j = 0; j < String(i).length; j++) {
      // console.log(String(i)[j]);
      if (!counter[String(i)[j]]) {
        counter[String(i)[j]] = 1;
      } else {
        counter[String(i)[j]]++;
        if (counter[String(i)[j]] >= 3) {
          flag = true;
          break;
        }
      }
    }
    if (!flag) sum++;
  }
  return sum;
};

// const test = {};
// test[1] = 1;
// test[1]++;
// console.log(test);
console.log(myFunction(1, 111));
