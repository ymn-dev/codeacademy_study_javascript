//https://app.codility.com/programmers/lessons/5-prefix_sums/
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function GenomicRangeQuery(S: string, P: number[], Q: number[]): number[] {
  // Implement your solution here
  //create a prefix sum for any nucleotide at any position, length +1 because prefix sum array start with 0
  //we also need to update other values with it too
  let sumNucleotide: number[][] = Array.from({ length: 3 }, () => Array(S.length + 1).fill(0));
  for (let i = 0; i < S.length; i++) {
    let foundA = 0;
    let foundC = 0;
    let foundG = 0;
    if (S[i] === "A") {
      foundA = 1;
    } else if (S[i] === "C") {
      foundC = 1;
    } else if (S[i] === "G") {
      foundG = 1;
    }
    sumNucleotide[0][i + 1] = sumNucleotide[0][i] + foundA;
    sumNucleotide[1][i + 1] = sumNucleotide[1][i] + foundC;
    sumNucleotide[2][i + 1] = sumNucleotide[2][i] + foundG;
  }
  const result: number[] = [];
  for (let i = 0; i < P.length; i++) {
    let startPosition: number = P[i];
    let endPosition: number = Q[i];
    if (startPosition > endPosition) {
      startPosition = Q[i];
      endPosition = P[i];
    }
    //check if there is a nucleotide of that type inside it
    //this "start position" is sum before where we want so no need for +1
    if (sumNucleotide[0][endPosition + 1] - sumNucleotide[0][startPosition] > 0) result.push(1);
    else if (sumNucleotide[1][endPosition + 1] - sumNucleotide[1][startPosition] > 0) result.push(2);
    else if (sumNucleotide[2][endPosition + 1] - sumNucleotide[2][startPosition] > 0) result.push(3);
    else result.push(4);
  }
  return result;
}
