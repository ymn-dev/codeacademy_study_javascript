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
    let elementCounter = 0;
    let found = -1;
    this._field.findIndex((element) => {
      found = element.indexOf(hat);
      if (found === -1) {
        elementCounter++;
      }
    });
    return [elementCounter, found];
  }
  getLoseCondition() {
    let elementCounter = 0;
    let found;
    const loseArr = [];
    this._field.forEach((element, index) => {
      found = element.indexOf(hole);
      if (found > -1) {
        loseArr.push([index, found]);
      }
    });
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
    let playSpaceRemaining = playSpace;
    playField[generateStartRow][generateStartCol] = pathCharacter;
    playSpaceRemaining--;
    playField[generateHatRow][generateHatCol] = hat;
    playSpaceRemaining--;
    // console.log(playField);

    // //reserving at least a path to win (DITCHED FOR NOW)
    // let winPath = [];
    // let currentPosition = [generateStartRow, generateStartCol];
    // const hatPosition = [generateHatRow, generateHatCol];
    // winPath.push([currentPosition, hatPosition]);
    // const minWinPathLength = Math.abs(generateStartRow - generateHatRow) + Math.abs(generateStartCol - generateHatCol) + 1;
    // const maxWinPathLength = Math.ceil((row * col) / 2.5) + 1;
    // let moves = maxWinPathLength - minWinPathLength;
    // const rowBetween = Field.getNumbersBetween(generateStartRow, generateHatRow);
    // const colBetween = Field.getNumbersBetween(generateStartCol, generateHatCol);
    // let shortestMove = rowBetween.length + colBetween.length - 2;

    let maxHole = Math.floor(playSpace / 3);
    let holeCount = 0;
    do {
      const putHoleLocation = [Math.floor(Math.random() * row), Math.floor(Math.random() * col)];
      if (playField[putHoleLocation[0]][putHoleLocation[1]] === fieldCharacter) {
        playField[putHoleLocation[0]][putHoleLocation[1]] = hole;
        holeCount++;
      }
    } while (holeCount <= maxHole);
    // console.log(playField);
    return [playField, generateStartRow, generateStartCol];
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
const myField = new Field(5, 5);
// myField.print();
// console.log(myField.getWinCondition());
// console.log(myField.getLoseCondition());
myField.play();
// Field.generateField(5, 5);
