let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:

const generateTarget = () => Math.floor(Math.random() * 10);
const compareGuesses = (humanGuess = 5, computerGuess, target) => {
  if (humanGuess < 0 && humanGuess > 9) {
    alert("INPUT MUST BE BETWEEN 0 to 9");
  }
  const humanDifference = Math.abs(target - humanGuess);
  const computerDifference = Math.abs(target - computerGuess);
  if (
    humanDifference === computerDifference ||
    humanDifference < computerDifference
  ) {
    return true;
  }
  return false;
};
const advanceRound = () => currentRoundNumber++;
const updateScore = (compareGuessesResult) => {
  if (compareGuessesResult) {
    console.log("You Win!!!!!");
    humanScore++;
  } else {
    console.log("Computer Win!!!");
    computerScore++;
  }
  advanceRound();
};

let humanGuess;
const compareGuessesResult = compareGuesses(
  humanGuess,
  generateTarget(),
  generateTarget()
);
updateScore(compareGuessesResult);
