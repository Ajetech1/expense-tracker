/*
let total = 0;

function addExpense() {
  let desc = document.getElementById("expenseDesc").value;
  let datePicker = document.getElementById("expenseDate").value;
  let amount = parseFloat(document.getElementById("expenseAmount").value);

  if (desc.trim() === "" || isNaN(amount)) {
    alert("Please enter valid expense description and amount.");
    return;
  }

  // Format the date
  let formattedDate = formatDate(datePicker);

  total += amount;

  let expensesTable = document
    .getElementById("expensesTable")
    .getElementsByTagName("tbody")[0];
  let row = expensesTable.insertRow();
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  cell1.textContent = formattedDate;
  cell2.textContent = desc;
  cell3.textContent = `#${amount.toFixed(2)}`;
  document.getElementById("totalAmount").textContent = total.toFixed(2);

  document.getElementById("expenseDesc").value = "";
  document.getElementById("expenseAmount").value = "";
}

function formatDate(dateString) {
  let date = new Date(dateString);
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
*/

/*
let total = 0;

// Load expenses from localStorage if available
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Display saved expenses
displayExpenses();

function addExpense() {
  let desc = document.getElementById("expenseDesc").value;
  let datePicker = document.getElementById("expenseDate").value;
  let amount = parseFloat(document.getElementById("expenseAmount").value);

  if (desc.trim() === "" || isNaN(amount)) {
    alert("Please enter valid expense description and amount.");
    return;
  }

  total += amount;

  let newExpense = {
    date: formatDate(datePicker),
    description: desc,
    amount: amount.toFixed(2),
  };

  // Add new expense to the array
  expenses.push(newExpense);

  // Save expenses to localStorage
  localStorage.setItem("totalAmount", total.toFixed(2));
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Display updated expenses
  displayExpenses();

  // Reset input fields
  document.getElementById("expenseDesc").value = "";
  document.getElementById("expenseAmount").value = "";
}

function formatDate(dateString) {
  let date = new Date(dateString);
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function displayExpenses() {
  let expensesList = document.getElementById("expensesList");
  expensesList.innerHTML = ""; // Clear previous content

  // Iterate through expenses array and create table rows
  expenses.forEach((expense) => {
    let row = document.createElement("tr");
    row.innerHTML = `<td>${expense.date}</td><td>${expense.description}</td><td>$${expense.amount}</td>`;
    expensesList.appendChild(row);
  });

  // Display total
  document.getElementById("totalAmount").textContent = total.toFixed(2);
}
*/

let totalIncome = parseFloat(localStorage.getItem("totalIncome")) || 0;
let totalExpenses = parseFloat(localStorage.getItem("totalExpenses")) || 0;
let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

displayData();

function addIncome() {
  let desc = document.getElementById("incomeDesc").value;
  let datePicker = document.getElementById("incomeDate").value;
  let amount = parseFloat(document.getElementById("incomeAmount").value);

  if (desc.trim() === "" || isNaN(amount)) {
    alert("Please enter valid income description and amount.");
    return;
  }

  totalIncome += amount;

  let newIncome = {
    date: formatDate(datePicker),
    description: desc,
    amount: amount.toFixed(2),
  };

  incomes.push(newIncome);

  localStorage.setItem("totalIncome", totalIncome.toFixed(2));
  localStorage.setItem("incomes", JSON.stringify(incomes));

  displayData();

  document.getElementById("incomeDesc").value = "";
  document.getElementById("incomeAmount").value = "";
}

function addExpense() {
  let desc = document.getElementById("expenseDesc").value;
  let datePicker = document.getElementById("expenseDate").value;
  let amount = parseFloat(document.getElementById("expenseAmount").value);

  if (desc.trim() === "" || isNaN(amount)) {
    alert("Please enter valid expense description and amount.");
    return;
  }

  totalExpenses += amount;

  let newExpense = {
    date: formatDate(datePicker),
    description: desc,
    amount: amount.toFixed(2),
  };

  expenses.push(newExpense);

  localStorage.setItem("totalExpenses", totalExpenses.toFixed(2));
  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayData();

  document.getElementById("expenseDesc").value = "";
  document.getElementById("expenseAmount").value = "";
}

function formatDate(dateString) {
  let date = new Date(dateString);
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function displayData() {
  displayIncomes();
  displayExpenses();
  displayBalance();
}

function displayIncomes() {
  let incomesList = document.getElementById("incomesList");
  incomesList.innerHTML = "";

  incomes.forEach((income) => {
    let row = document.createElement("tr");
    row.innerHTML = `<td>${income.date}</td><td>${income.description}</td><td>#${income.amount}</td>`;
    incomesList.appendChild(row);
  });

  document.getElementById("totalIncome").textContent = totalIncome.toFixed(2);
}

function displayExpenses() {
  let expensesList = document.getElementById("expensesList");
  expensesList.innerHTML = "";

  expenses.forEach((expense) => {
    let row = document.createElement("tr");
    row.innerHTML = `<td>${expense.date}</td><td>${expense.description}</td><td>#${expense.amount}</td>`;
    expensesList.appendChild(row);
  });

  document.getElementById("totalExpenses").textContent =
    totalExpenses.toFixed(2);
}

function displayBalance() {
  let balance = totalIncome - totalExpenses;
  document.getElementById("balance").textContent = balance.toFixed(2);
}
