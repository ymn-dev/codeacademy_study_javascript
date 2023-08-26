const prompt = require("prompt-sync")({ sigint: true });
const clear = require("clear");

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(row, col) {
    // this._field = arr;
    // this._startPosition = [0, 0];
    let generator = Field.generateField(row, col);
    this._field = generator[0];
    this._startPosition = [generator[1], generator[2]];
  }
  get field() {
    return this._field;
  }
  set field(arr) {
    this._field = arr;
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
  static arrayComparision(arrSource, arrToFind) {
    const index = arrSource.findIndex((arrSourceItem) => JSON.stringify(arrSourceItem) === JSON.stringify(arrToFind));
    return index;
  }
  move(key) {
    let myPosition = this._startPosition;
    if (key === "W") {
      if (myPosition[0] === 0) {
        return [false, "You left the map"];
      } else {
        myPosition[0]--;
        if (Field.arrayComparision(this.getLoseCondition(), myPosition) > -1) {
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
        if (Field.arrayComparision(this.getLoseCondition(), myPosition) > -1) {
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
        if (Field.arrayComparision(this.getLoseCondition(), myPosition) > -1) {
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
        if (Field.arrayComparision(this.getLoseCondition(), myPosition) > -1) {
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
      let input = prompt("Which Way?: ").toUpperCase();
      if (input.length === 1 && (input === "W" || input === "A" || input === "S" || input === "D")) {
        let result = this.move(input);
        if (!result[0]) {
          console.log(result[1]);
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
    //making the play field all the moveable space
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
    do {
      generateHatRow = Math.floor(Math.random() * row);
      generateHatCol = Math.floor(Math.random() * col);
    } while (generateStartRow === generateHatRow && generateStartCol === generateHatCol);
    playField[generateStartRow][generateStartCol] = pathCharacter;
    playField[generateHatRow][generateHatCol] = hat;

    let maxHole = Math.floor(playSpace / 3);
    let holeCount = 0;
    let testField = Array.from(playField);
    do {
      const putHoleLocation = [Math.floor(Math.random() * row), Math.floor(Math.random() * col)];
      if (testField[putHoleLocation[0]][putHoleLocation[1]] === fieldCharacter) {
        testField[putHoleLocation[0]][putHoleLocation[1]] = hole;
        holeCount++;
      }
    } while (holeCount < maxHole);
    // Validate the testField using a simple maze solver
    let startRow = generateStartRow;
    let startCol = generateStartCol;
    let endRow = generateHatRow;
    let endCol = generateHatCol;

    let wasHere = Array.from(testField, () => Array(testField[0].length).fill(false));
    // console.log(wasHere);
    function recursiveSolve(x, y) {
      if (x === endRow && y === endCol) return true;
      if (testField[x][y] === hole || wasHere[x][y]) return false;
      wasHere[x][y] = true;
      if (x !== 0 && recursiveSolve(x - 1, y)) return true;
      if (x !== testField.length - 1 && recursiveSolve(x + 1, y)) return true;
      if (y !== 0 && recursiveSolve(x, y - 1)) return true;
      if (y !== testField[0].length - 1 && recursiveSolve(x, y + 1)) return true;
      return false;
    }

    if (!recursiveSolve(startRow, startCol)) {
      console.log("Generated field is not solvable. Regenerating...");
      return this.generateField(row, col); // Retry generating the field
    }
    // console.log(wasHere);
    // console.log(testField);
    return [testField, generateStartRow, generateStartCol];
  }

  static getNumbersBetween(start, end) {
    const numbers = [];

    for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
      numbers.push(i);
    }

    return numbers;
  }
}

// const myField = new Field([
//   ["*", "░", "O"],
//   ["░", "O", "░"],
//   ["░", "^", "░"],
// ]);
// const myField = new Field(5, 5);
// myField.print();
// console.log(myField.getLoseCondition());
// console.log(myField.getWinCondition());
let createField;
do {
  const height = parseInt(prompt("Insert Height: "));
  const width = parseInt(prompt("Insert Width: "));
  if (!isNaN(height) && !isNaN(width)) {
    createField = new Field(height, width);
    createField.play();
    break;
  } else {
    console.log("Invalid Input(s), try again!");
  }
} while (true);
// Field.generateField(5, 5);
