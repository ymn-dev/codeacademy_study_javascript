/*
Daily working question - 20230912
You'd like to keep a record of your daily expenses to better understand your spending habits.
Develop a program that logs daily expenses and categorizes them (e.g., Food, Transport, Entertainment).
Create a feature in the above program that provides a weekly or monthly report on spending per category.
Noted: ออกแบบ Input/Output (I/O) เองทั้งหมด พร้อมอธิบายว่าทำไมถึงออกแบบมาแบบนั้น
*/

const myExpense = {
  log: [],
  addLog(date, category, moneyspent) {
    category = category.toLowerCase();
    const myDate = this.convertStringToDateObject(date);
    const existingDay = this.log.find((day) => day.date.toDateString() === myDate.toDateString());

    if (existingDay) {
      if (!existingDay[category]) {
        existingDay[category] = moneyspent;
      } else {
        existingDay[category] += moneyspent;
      }
    } else {
      const newDay = {
        date: myDate,
        [category]: moneyspent,
      };
      this.log.push(newDay);
    }
  },
  convertStringToDateObject(dateString) {
    const dateSplit = dateString.split("-"); // Split the string into parts, YYYY,MM,DD
    const myDate = new Date(Number(dateSplit[0]), Number(dateSplit[1]) - 1, Number(dateSplit[2]));
    return myDate;
  },
  getWeeklyExpense(date) {
    //will take input of 7 days before it
    let myDate = this.convertStringToDateObject(date);
    let weeklyExpense = {};
    for (let i = 0; i < 7; i++) {
      myDate.setDate(myDate.getDate() - 1);
      const existingDay = this.log.find((day) => day.date.toDateString() === myDate.toDateString());
      if (existingDay) {
        for (const key in existingDay) {
          if (key !== "date") {
            if (!weeklyExpense[key]) {
              weeklyExpense[key] = existingDay[key];
            } else {
              weeklyExpense[key] += existingDay[key];
            }
          }
        }
      } else continue;
    }
    return weeklyExpense;
  },
  // getMonthlyExpense(year, month) {},
};

myExpense.addLog("2023-9-12", "entertainment", 1500);
myExpense.addLog("2023-9-12", "food", 400);

myExpense.addLog("2023-9-11", "food", 500);
myExpense.addLog("2023-9-10", "transport", 500);
console.log(myExpense.getWeeklyExpense("2023-9-13"));
/*
[Assignment 6 - 20230912]
- Assume you are going to the supermarket, and you pick many items and put to the basket
    - Write a program that calculates the total cost of items in a shopping cart, including tax.
    - From the above question, separate total cost by category
- Write a program that calculates the amount of interest earned on a bank account given the principal, interest rate, and time.
*/

//imagine object of items in supermarket with .price and .category on it
const totalCost = (purchaseList) => {
  return purchaseList.reduce((sum, item) => sum + item.price, 0);
};

const totalCostByCategory = (purchaseList) => {
  const categories = {};
  purchaseList.forEach((item) => {
    if (!categories[item.category]) {
      categories[item.category] = item.price;
    } else {
      categories[item.category] += item.price;
    }
  });
  return categories;
};

const calculateSimpleInterest = (money, rate, time) => {
  //take percentage rate, time in month
  return money * (rate / 100) * time;
};

// console.log(calculateSimpleInterest(1000000, 3, 10));
