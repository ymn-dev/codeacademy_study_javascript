// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};
// console.log(mockUpStrand());

const pAequorFactory = (number, DNAArr) => {
  const pAequor = {
    specimenNum: number,
    dna: DNAArr,
  };
  return pAequor;
};
// console.log(pAequorFactory(2547,mockUpStrand));

const mutate = (DNAArr) => {
  const mutatePos = Math.floor(Math.random() * DNAArr.length);
  // console.log(mutatePos);
  let previousDNA = DNAArr[mutatePos];
  do {
    // console.log("+a random attempt");
    DNAArr[mutatePos] = returnRandBase();
  } while (DNAArr[mutatePos] === previousDNA);
  // console.log("before = "+previousDNA);
  // console.log("after = "+DNAArr[mutatePos]);
};

// mutate(mockUpStrand());
