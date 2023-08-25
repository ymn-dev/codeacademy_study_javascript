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
    this._startPosition = this._field[0][0];
  }
  get field() {
    return this._field;
  }
  set field(arr) {
    this._field = arr;
  }
  print() {
    console.clear();
    this._field.forEach((row) => {
      console.log(row.join(""));
    });
  }
  checkLoseCondition() {}
  checkWinCondition() {
    let elementCounter = 0;
    let found = -1;
    this._field.findIndex((element) => {
      found = element.indexOf("^");
      if (found === -1) {
        elementCounter++;
      }
    });
    return [elementCounter, found];
  }
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

myField.print();
console.log(myField.checkWinCondition());
