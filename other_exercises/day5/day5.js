/*
[Assignment 5 - 20230911]
You are working on a project that requires you to manage the data of employees.
> Sort a list of people based on their age.
> Calculates the average age of a group of people by department.
> Calculates the total salary of all employees in a company.
> Finds the highest-paid employee in a company.
> Calculates the total salary of all employees in a department.
> Finds the highest-paid employee on each department
> Grouping by age distribution (Categorize by your decision)
----
Example data
+------------+-----+-----------+--------+-------------------+
|    Name    | Age | Department| Salary | Performance Rating|
+------------+-----+-----------+--------+-------------------+
| John Doe   |  30 | Sales     | 50,000 | 4.5               |
| Jane Smith |  28 | Marketing | 48,000 | 3.7               |
| Alice Lee  |  35 | Sales     | 52,000 | 4.0               |
| Bob Gray   |  40 | HR        | 55,000 | 4.9               |
+------------+-----+-----------+--------+-------------------+
----
Note: Could you do it at least 100 users? Feel free to randomly generate data 
*/
// import { faker } from "@faker-js/faker";
const { faker } = require("@faker-js/faker");
const departments = ["Sales", "HR", "Marketing", "QA", "Developer", "Senior Developer"];
class Employee {
  constructor(name, age, department, salary, performanceRating) {
    this.name = name;
    this.age = age;
    this.department = department;
    this.salary = salary;
    this.performanceRating = performanceRating;
  }
  static createRandomEmployee() {
    const generateRandomDepartment = () => {
      const randomIndex = Math.floor(Math.random() * 5);
      return departments[randomIndex];
    };
    return new Employee(faker.person.fullName(), Math.floor(Math.random() * 40 + 20), generateRandomDepartment(), Math.floor((Math.random() * 80000 + 20000) / 1000) * 1000, (Math.random() * 2.5 + 2.5).toFixed(1));
  }
}

const generateEmployee = (num = 1) => {
  const employeeList = [];
  for (let i = 0; i < num; i++) {
    const employee = Employee.createRandomEmployee();
    employeeList.push(employee);
  }
  if (employeeList.length > 1) {
    return employeeList;
  } else {
    return employeeList[0];
  }
};

const employeeList = generateEmployee(100);
// console.log(employeeList);

const ageSort = (arr) => {
  return arr.sort((a, b) => a.age - b.age);
};
// const ageSortedList = ageSort(employeeList);
// console.log(ageSortedList);

const calculateAverageAgeByDepartment = (arr) => {
  const departmentAge = {};
  const length = departments.length;
  for (let i = 0; i < length; i++) {
    let countThisDepartment = 0;
    let sumThisDepartment = 0;

    arr.forEach((employee) => {
      if (employee.department === departments[i]) {
        countThisDepartment++;
        sumThisDepartment += employee.age;
      }
    });
    let currentDepartmentAge = countThisDepartment === 0 ? 0 : sumThisDepartment / countThisDepartment;
    departmentAge[departments[i]] = currentDepartmentAge;
  }
  return departmentAge;
};
// console.log(calculateAverageAgeByDepartment(employeeList));

const calculateSumSalaryCompany = (arr) => {
  return arr.reduce((sum, employee) => sum + employee.salary, 0);
};
// console.log(calculateSumSalaryCompany(employeeList));

const findHighestPaidCompany = (arr) => {
  return arr.sort((a, b) => a.salary - b.salary)[arr.length - 1];
};
// console.log(findHighestPaidCompany(employeeList));

const calculateSumSalaryDepartment = (arr) => {
  const departmentSalary = {};
  const length = departments.length;
  for (let i = 0; i < length; i++) {
    let sumThisDepartment = 0;

    arr.forEach((employee) => {
      if (employee.department === departments[i]) {
        sumThisDepartment += employee.salary;
      }
    });
    departmentSalary[departments[i]] = sumThisDepartment;
  }
  return departmentSalary;
};
// console.log(calculateSumSalaryDepartment(employeeList));

const findHighestPaidDepartment = (arr) => {
  const departmentHighestPaid = {};
  const length = departments.length;
  for (let i = 0; i < length; i++) {
    let exist = true;
    const thisDepartment = arr.filter((employee) => employee.department === departments[i]);
    if (thisDepartment.length === 0) exist = false;
    if (!exist) {
      departmentHighestPaid[departments[i]] = "none";
    } else {
      const highestPaidThisDepartment = thisDepartment.sort((a, b) => b.salary - a.salary)[0];
      departmentHighestPaid[departments[i]] = highestPaidThisDepartment;
    }
  }
  return departmentHighestPaid;
};
// console.log(findHighestPaidDepartment(employeeList));

const groupByAge = (arr) => {
  const ageGroups = [];
  // only generated employee age 20-60
  const in20s = ["in 20s"];
  const in30s = ["in 30s"];
  const in40s = ["in 40s"];
  const in50s = ["in 50s"];
  const retireSoon = ["retire soon"];
  arr.forEach((employee) => {
    if (employee.age < 30) {
      in20s.push(employee);
    } else if (employee.age < 40) {
      in30s.push(employee);
    } else if (employee.age < 50) {
      in40s.push(employee);
    } else if (employee.age < 60) {
      in50s.push(employee);
    } else {
      retireSoon.push(employee);
    }
  });
  ageGroups.push(in20s, in30s, in40s, in50s, retireSoon);
  return ageGroups;
};

// console.log(groupByAge(employeeList));
