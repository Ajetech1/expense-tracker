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

  incomes.forEach((income, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${income.date}</td>
      <td>${income.description}</td>
      <td>₦${income.amount}</td>
      <td><button style="background-color: red; color: white; border: none; padding: 10px; cursor: pointer;" onclick="deleteIncome(${index})">Delete</button></td>
    `;
    incomesList.appendChild(row);
  });

  document.getElementById("totalIncome").textContent = totalIncome.toFixed(2);
}

function displayExpenses() {
  let expensesList = document.getElementById("expensesList");
  expensesList.innerHTML = "";

  expenses.forEach((expense, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${expense.date}</td>
      <td>${expense.description}</td>
      <td>₦${expense.amount}</td>
      <td><button style="background-color: red; color: white; border: none; padding: 10px; cursor: pointer;" onclick="deleteExpense(${index})">Delete</button></td>
    `;
    expensesList.appendChild(row);
  });

  document.getElementById("totalExpenses").textContent =
    totalExpenses.toFixed(2);
}

function deleteIncome(index) {
  totalIncome -= parseFloat(incomes[index].amount);
  incomes.splice(index, 1);

  localStorage.setItem("totalIncome", totalIncome.toFixed(2));
  localStorage.setItem("incomes", JSON.stringify(incomes));

  displayData();
}

function deleteExpense(index) {
  totalExpenses -= parseFloat(expenses[index].amount);
  expenses.splice(index, 1);

  localStorage.setItem("totalExpenses", totalExpenses.toFixed(2));
  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayData();
}

// Display balance function begins here
function displayBalance() {
  let balance = totalIncome - totalExpenses;
  document.getElementById("balance").textContent = balance.toFixed(2);
}

// Contact us Js Begins Here

function sendEmail(event) {
  event.preventDefault();
  let isValid = true;

  const fullName = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const sub = document.getElementById("subject").value;
  const mess = document.getElementById("message").value;

  if (fullName === "") {
    document.querySelector("#name + .error-text").style.display = "block";
    isValid = false;
  } else {
    document.querySelector("#name + .error-text").style.display = "none";
  }

  if (email === "") {
    document.querySelector("#email + .error-text").style.display = "block";
    isValid = false;
  } else {
    document.querySelector("#email + .error-text").style.display = "none";
  }

  if (phone === "") {
    document.querySelector("#phone + .error-text").style.display = "block";
    isValid = false;
  } else {
    document.querySelector("#phone + .error-text").style.display = "none";
  }

  if (sub === "") {
    document.querySelector("#subject + .error-text").style.display = "block";
    isValid = false;
  } else {
    document.querySelector("#subject + .error-text").style.display = "none";
  }

  if (mess === "") {
    document.querySelector("#message + .error-text").style.display = "block";
    isValid = false;
  } else {
    document.querySelector("#message + .error-text").style.display = "none";
  }

  if (isValid) {
    const bodyMessage =
      "Full Name: " +
      fullName +
      "<br/> Email: " +
      email +
      "<br/> Phone Number: " +
      phone +
      "<br/> Message: " +
      mess;

    console.log(bodyMessage);

    Email.send({
      SecureToken: "e4b4f164-84a5-449b-9d42-07a8a8d11ee5",
      To: "jeleelajetunmobi@gmail.com",
      From: "jeleelajetunmobi@gmail.com",
      Subject: sub,
      Body: bodyMessage,
    }).then((message) => {
      if (message === "OK") {
        swal("Success!", "Message sent successfully!", "success").then(() => {
          window.location.reload();
        });
      } else {
        swal("Oops", "Something went wrong!", "error");
      }
    });
  }
}

document.getElementById("contactform").addEventListener("submit", sendEmail);
