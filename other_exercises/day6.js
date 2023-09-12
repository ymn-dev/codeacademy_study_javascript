/*
Daily working question - 20230912
You'd like to keep a record of your daily expenses to better understand your spending habits.
Develop a program that logs daily expenses and categorizes them (e.g., Food, Transport, Entertainment).
Create a feature in the above program that provides a weekly or monthly report on spending per category.
Noted: ออกแบบ Input/Output (I/O) เองทั้งหมด พร้อมอธิบายว่าทำไมถึงออกแบบมาแบบนั้น
*/

/*
[Assignment 6 - 20230912]
- Assume you are going to the supermarket, and you pick many items and put to the basket
    - Write a program that calculates the total cost of items in a shopping cart, including tax.
    - From the above question, separate total cost by category
- Write a program that calculates the amount of interest earned on a bank account given the principal, interest rate, and time.
*/

//imagine object of items in supermarket with .price and .category on it
const totalCost = (purchaseList) => {
  return purchaseList.reduce((sum, item) => sum + item.price);
};

const totalCostByCategory = (purchaseList) => {
  const categories = {};
  purchaseList.forEach((item) => {
    if (categories[item.category] === undefined) {
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

console.log(calculateSimpleInterest(1000000, 3, 10));
