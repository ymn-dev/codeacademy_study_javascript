// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function GenomicRangeQuery(S: string, P: number[], Q: number[]): number[] {
  // Implement your solution here

  let answer: number[] = [];
  for (let i = 0; i < P.length; i++) {
    let startPoint: number = P[i];
    let endPoint: number = Q[i];
    if (P[i] > Q[i]) {
      startPoint = Q[i];
      endPoint = P[i];
    }
    const myArr: string = S.slice(startPoint, endPoint + 1);
    if (myArr.indexOf("A") > -1) {
      answer.push(1);
    } else if (myArr.indexOf("C") > -1) {
      answer.push(2);
    } else if (myArr.indexOf("G") > -1) {
      answer.push(3);
    } else if (myArr.indexOf("T") > -1) {
      answer.push(4);
    }
  }
  return answer;
}
