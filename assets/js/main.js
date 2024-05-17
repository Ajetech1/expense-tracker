// JS Variable declaration

let totalIncome = parseFloat(localStorage.getItem("totalIncome")) || 0;
let totalExpenses = parseFloat(localStorage.getItem("totalExpenses")) || 0;
let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

displayData();

// Income function begins here
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

// Expense function begins here
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

// Formatdate function begins here
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

// Display balance function begins here
function displayBalance() {
  let balance = totalIncome - totalExpenses;
  document.getElementById("balance").textContent = balance.toFixed(2);
}
