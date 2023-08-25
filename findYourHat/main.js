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
      if (found === -1) {
        elementCounter++;
      } else {
        loseArr.push([elementCounter, found]);
      }
    });
    return loseArr;
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
