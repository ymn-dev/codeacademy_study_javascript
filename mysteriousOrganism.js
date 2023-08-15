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
    compareDNA(anotherPAequor) {
      let commonDNA = 0;
      // console.log("dna1 "+this.dna);
      // console.log("dna2 "+anotherPAequor.dna);
      for (let i = 0; i < anotherPAequor.dna.length; i++) {
        if (this.dna[i] === anotherPAequor.dna[i]) {
          commonDNA++;
        }
      }
      // console.log(commonDNA);
      commonDNA /= anotherPAequor.dna.length;
      // console.log(`specimen #${this.specimenNum} and specimen #${anotherPAequor.specimenNum} have ${(commonDNA*=100).toFixed(2)}% DNA in common.`);
      return `specimen #${this.specimenNum} and specimen #${
        anotherPAequor.specimenNum
      } have ${(commonDNA *= 100).toFixed(2)}% DNA in common.`;
    },
    willLikelySurvive() {
      // console.log(this.dna);
      let goodDNA = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          goodDNA++;
        }
      }
      // console.log(goodDNA);
      goodDNA /= this.dna.length;
      // console.log(goodDNA);
      if (goodDNA >= 0.6) {
        // console.log("likely will survive");
        return true;
      } else {
        // console.log("likely wont survive");
        return false;
      }
    },
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
// const pA2547 = pAequorFactory("2547",mockUpStrand());
// const pA2548 = pAequorFactory("2548",mockUpStrand());
// pA2547.compareDNA(pA2548);
// pA2547.willLikelySurvive();
let assignedNum = 0;
const createUniqueNum = (num) => {
  assignedNum++;
  return assignedNum;
};

const createStrongSamples = (num) => {
  const strongPAequor = [];
  do {
    const temp = pAequorFactory(createUniqueNum(), mockUpStrand());
    if (temp.willLikelySurvive()) {
      strongPAequor.push(temp);
    } else continue;
  } while (strongPAequor.length < num);
  return strongPAequor;
};
const testPAequor = createStrongSamples(30);
console.log(testPAequor);
