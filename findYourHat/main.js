const prompt = require("prompt-sync")({ sigint: true });
const clear = require("clear");

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(row, col) {
    let generator = Field.generateField(row, col);
    this._field = generator[0];
    this._startPosition = [generator[1], generator[2]];
  }
  print() {
    clear();
    this._field.forEach((row) => {
      console.log(row.join(""));
    });
  }
  getWinCondition() {
    let found;
    let winLocation;
    this._field.forEach((element, index) => {
      found = element.indexOf(hat);
      if (found > -1) {
        winLocation = [index, found];
      }
    });
    return winLocation;
  }
  getLoseCondition() {
    const loseArr = [];
    for (let i = 0; i < this._field.length; i++) {
      const row = this._field[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] === hole) {
          loseArr.push([i, j]);
        }
      }
    }
    return loseArr;
  }
  move(key) {
    let myPosition = this._startPosition;
    const arrayComparision = (arrSource, arrToFind) => {
      const index = arrSource.findIndex((arrSourceItem) => JSON.stringify(arrSourceItem) === JSON.stringify(arrToFind));
      return index;
    };
    if (key === "W") {
      if (myPosition[0] === 0) {
        return [false, "You left the map"];
      } else {
        myPosition[0]--;
        if (arrayComparision(this.getLoseCondition(), myPosition) > -1) {
          return [false, "You fell into a hole!"];
        } else if (JSON.stringify(myPosition) === JSON.stringify(this.getWinCondition())) {
          return [false, "You Win"];
        } else {
          this._field[myPosition[0]][myPosition[1]] = pathCharacter;
          return [true];
        }
      }
    }
    if (key === "A") {
      if (myPosition[1] === 0) {
        return [false, "You left the map"];
      } else {
        myPosition[1]--;
        if (arrayComparision(this.getLoseCondition(), myPosition) > -1) {
          return [false, "You fell into a hole!"];
        } else if (JSON.stringify(myPosition) === JSON.stringify(this.getWinCondition())) {
          return [false, "You Win"];
        } else {
          this._field[myPosition[0]][myPosition[1]] = pathCharacter;
          return [true];
        }
      }
    }
    if (key === "S") {
      if (myPosition[0] === this._field.length - 1) {
        return [false, "You left the map"];
      } else {
        myPosition[0]++;
        if (arrayComparision(this.getLoseCondition(), myPosition) > -1) {
          return [false, "You fell into a hole!"];
        } else if (JSON.stringify(myPosition) === JSON.stringify(this.getWinCondition())) {
          return [false, "You Win"];
        } else {
          this._field[myPosition[0]][myPosition[1]] = pathCharacter;
          return [true];
        }
      }
    }
    if (key === "D") {
      if (myPosition[1] === this._field[0].length - 1) {
        return [false, "You left the map"];
      } else {
        myPosition[1]++;
        if (arrayComparision(this.getLoseCondition(), myPosition) > -1) {
          return [false, "You fell into a hole!"];
        } else if (JSON.stringify(myPosition) === JSON.stringify(this.getWinCondition())) {
          return [false, "You Win"];
        } else {
          this._field[myPosition[0]][myPosition[1]] = pathCharacter;
          return [true];
        }
      }
    }
  }

  play() {
    while (true) {
      this.print();
      console.log("How to play: W A S D to move!");
      let input = prompt("Which Way?: ").toUpperCase(); //make input not case sensitive
      if (input.length === 1 && (input === "W" || input === "A" || input === "S" || input === "D")) {
        let result = this.move(input);
        if (!result[0]) {
          //this checks true/false in return array, false will stop the game
          console.log(result[1]); //take message attached to false
          break;
        }
      } else {
        console.log("Invalid Input");
      }
    }
  }
  playHard() {
    let stepCount = 0;
    let successfullyPutAHole = false;
    const stepsUntilMoreHole = 3;
    while (true) {
      this.print();
      console.log("How to play: W A S D to move!");
      console.log(`In hard mode, a random hole will appear every ${stepsUntilMoreHole} steps`);
      let input = prompt("Which Way?: ").toUpperCase(); //make input not case sensitive
      if (input.length === 1 && (input === "W" || input === "A" || input === "S" || input === "D")) {
        let result = this.move(input);
        stepCount++;
        if (stepCount === stepsUntilMoreHole) {
          const row = this._field.length;
          const col = this._field[0].length;
          do {
            const putHoleLocation = [Math.floor(Math.random() * row), Math.floor(Math.random() * col)];
            if (this._field[putHoleLocation[0]][putHoleLocation[1]] === fieldCharacter) {
              this._field[putHoleLocation[0]][putHoleLocation[1]] = hole;
              successfullyPutAHole = true;
            }
          } while (!successfullyPutAHole);
          stepCount = 0;
          successfullyPutAHole = false;
        }
        if (!result[0]) {
          //this checks true/false in return array, false will stop the game
          console.log(result[1]); //take message attached to false
          break;
        }
      } else {
        console.log("Invalid Input");
      }
    }
  }
  static generateField(row, col) {
    parseInt(row);
    parseInt(col);
    if (row < 2 && col < 2) {
      console.log("Invalid input");
      return "Invalid input";
    }
    const playField = [];
    const playSpace = row * col;
    //generating empty field
    for (let i = 0; i < row; i++) {
      const rowArray = [];
      for (let j = 0; j < col; j++) {
        rowArray.push(fieldCharacter);
      }
      playField.push(rowArray);
    }
    const generateStartRow = Math.floor(Math.random() * row);
    const generateStartCol = Math.floor(Math.random() * col);
    let generateHatRow;
    let generateHatCol;
    //generating start and win condition
    do {
      generateHatRow = Math.floor(Math.random() * row);
      generateHatCol = Math.floor(Math.random() * col);
      //re-random until the position isn't on top of start
    } while (generateStartRow === generateHatRow && generateStartCol === generateHatCol);
    playField[generateStartRow][generateStartCol] = pathCharacter;
    playField[generateHatRow][generateHatCol] = hat;

    let maxHole = Math.floor(playSpace / 3);
    let holeCount = 0;
    do {
      const putHoleLocation = [Math.floor(Math.random() * row), Math.floor(Math.random() * col)];
      if (playField[putHoleLocation[0]][putHoleLocation[1]] === fieldCharacter) {
        playField[putHoleLocation[0]][putHoleLocation[1]] = hole;
        holeCount++;
      }
    } while (holeCount < maxHole);
    // validate the playField using a recursive solver below
    let startRow = generateStartRow;
    let startCol = generateStartCol;
    let endRow = generateHatRow;
    let endCol = generateHatCol;

    let wasHere = Array.from(playField, () => Array(playField[0].length).fill(false));
    //make a new array of false to use for recursive path
    function recursiveSolve(x, y) {
      //reach the end condition
      if (x === endRow && y === endCol) return true;
      //if real field equivalent of slot is a hole or we're taking the same path return false
      if (playField[x][y] === hole || wasHere[x][y]) return false;
      //mark current location
      wasHere[x][y] = true;
      /*moving left, checking whether you're at the edge or not
        then we call this function again (recursivev), it will keep going left until it cant (return false)
        then it will move down to lower condition(s) aka try right/up/down next, marking wasHere along the way*/
      if (x !== 0 && recursiveSolve(x - 1, y)) return true;
      if (x !== playField.length - 1 && recursiveSolve(x + 1, y)) return true;
      if (y !== 0 && recursiveSolve(x, y - 1)) return true;
      if (y !== playField[0].length - 1 && recursiveSolve(x, y + 1)) return true;
      return false;
    }
    if (!recursiveSolve(startRow, startCol)) {
      // console.log("Generated field is not solvable. Regenerating...");
      return this.generateField(row, col); // retry generating the field if final result of recursive loop is false
    }
    return [playField, generateStartRow, generateStartCol];
  }
}

let createField;
//keep asking for input until getting a proper input
do {
  const height = parseInt(prompt("How many rows?: "));
  const width = parseInt(prompt("How many columns?: "));
  if (!isNaN(height) && !isNaN(width)) {
    createField = new Field(height, width);
    let notValidInput = true;
    do {
      const mode = prompt("Normal or hard mode? (N/H): ").toUpperCase();
      notValidInput = false;
      mode === "N" ? createField.play() : mode === "H" ? createField.playHard() : (notValidInput = true);
    } while (notValidInput);
    break;
  } else {
    console.log("Invalid Input(s), try again!");
  }
} while (true);
