const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(arr = [[]]) {
    this._field = arr;
    this._positionX = 0;
    this._positionY = 0;
    this._startPosition = [0, 0];
  }
  get field() {
    return this._field;
  }
  set field(arr) {
    this._field = arr;
  }
  print() {
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
    const index = arrSource.findIndex(
      (arrSourceItem) =>
        JSON.stringify(arrSourceItem) === JSON.stringify(arrToFind)
    );
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
        } else if (
          JSON.stringify(myPosition) === JSON.stringify(this.getWinCondition())
        ) {
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
        } else if (
          JSON.stringify(myPosition) === JSON.stringify(this.getWinCondition())
        ) {
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
        } else if (
          JSON.stringify(myPosition) === JSON.stringify(this.getWinCondition())
        ) {
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
        } else if (
          JSON.stringify(myPosition) === JSON.stringify(this.getWinCondition())
        ) {
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
      if (
        input.length === 1 &&
        (input === "W" || input === "A" || input === "S" || input === "D")
      ) {
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
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

myField.print();
console.log(myField.getWinCondition());
console.log(myField.getLoseCondition());
myField.play();
