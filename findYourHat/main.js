const prompt = require("prompt-sync")({ sigint: true });
const clear = require("clear");

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
const pathTaken = " ";
class Field {
  constructor(row, col) {
    let generator = Field.generateField(row, col);
    this._field = generator[0];
    this._startPosition = [generator[1], generator[2]];
    this._playSpace = row * col - 2; //in case want to optimize hard mode bomb generating later
  }
  print() {
    clear();
    const border = "+" + "-".repeat(this._field[0].length) + "+";
    console.log(border);
    // Print field rows with borders
    this._field.forEach((row) => {
      console.log("|" + row.join("") + "|");
    });
    console.log(border);
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
    const directions = {
      W: [-1, 0], // Up
      A: [0, -1], // Left
      S: [1, 0], // Down
      D: [0, 1], // Right
    };

    if (!(key in directions)) {
      return [false, "Invalid Input"];
    }

    const direction = directions[key];
    let newRow = this._startPosition[0] + direction[0];
    let newCol = this._startPosition[1] + direction[1];

    if (newRow < 0 || newRow >= this._field.length || newCol < 0 || newCol >= this._field[0].length) {
      return [false, "You left the map"];
    }

    if (this._field[newRow][newCol] === hole) {
      return [false, "You fell into a hole!"];
    }

    if (this._field[newRow][newCol] === hat) {
      return [false, "You Win"];
    }

    this._field[this._startPosition[0]][this._startPosition[1]] = pathTaken; // mark previous location as pathTaken
    this._field[newRow][newCol] = pathCharacter; // mark new location as pathCharacter
    this._startPosition = [newRow, newCol]; // update the starting position

    return [true];
  }

  play(mode = "N") {
    const stepsUntilMoreHole = 3;
    let stepCount = 0;
    let successfullyPutAHole = false;

    while (true) {
      this.print();
      console.log("How to play: W A S D to move!");
      if (mode === "H") {
        console.log(`In hard mode, a random hole will appear every ${stepsUntilMoreHole} steps.`);
        console.log(`NO GUARANTEED VICTORY. Move wisely, Say your prayers.`);
      }
      let input = prompt("Which Way?: ").toUpperCase(); //make input not case sensitive
      if (input.length === 1 && (input === "W" || input === "A" || input === "S" || input === "D")) {
        let result = this.move(input);
        if (mode === "H") {
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

  static generateField(row, col, mode = "N") {
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

//keep asking for input until getting a proper input
do {
  let createField;
  const height = parseInt(prompt("How many rows?: "));
  const width = parseInt(prompt("How many columns?: "));
  if (!isNaN(height) && !isNaN(width)) {
    let mode;
    do {
      mode = prompt("Normal or hard mode? (N/H): ").toUpperCase();
      if (mode !== "N" && mode !== "H") console.log("Invalid input, try again");
    } while (mode !== "N" && mode !== "H");
    createField = new Field(height, width, mode);
    createField.play(mode);
    break;
  } else {
    console.log("Invalid Input(s), try again!");
  }
} while (true);
