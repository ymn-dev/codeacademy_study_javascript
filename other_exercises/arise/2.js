/*
input a number then loop print until that number and if that number is power of 2 print 'POWER -> 2^(power)'
*/

const myFunction = (num) => {
  let powerOfTwo = 1;
  let power = 0;
  for (let i = 1; i <= num; i++) {
    if (i === powerOfTwo) {
      console.log(`POWER -> 2^${power}`);
      power++;
      powerOfTwo = 2 ** power;
      continue;
    }
    console.log(i);
  }
};

myFunction(8);
