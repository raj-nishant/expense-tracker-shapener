document.addEventListener("DOMContentLoaded", () => {
  loadExpenses();
});

function addExpense() {
  const description = document.getElementById("expenseDescription").value;
  const amount = document.getElementById("expenseAmount").value;
  const category = document.getElementById("expenseCategory").value;

  if (description && amount && category) {
    const expense = {
      description,
      amount,
      category,
    };

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("expenseForm").reset();
    loadExpenses();
  }
}

function loadExpenses() {
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";

  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
          <div class="flex items-center justify-between">
            <span>${expense.description} - $${expense.amount} (${expense.category})</span>
            <button class="ml-2 text-red-500" onclick="editExpense(${index})">Edit</button>
            <button class="ml-2 text-red-500" onclick="deleteExpense(${index})">Delete</button>
          </div>
        `;
    expenseList.appendChild(li);
  });
}

function deleteExpense(index) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  loadExpenses();
}

function editExpense(index) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const expenseToEdit = expenses[index];

  document.getElementById("expenseDescription").value =
    expenseToEdit.description;
  document.getElementById("expenseAmount").value = expenseToEdit.amount;
  document.getElementById("expenseCategory").value = expenseToEdit.category;

  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  loadExpenses();
}

function clearAll() {
  localStorage.removeItem("expenses");
  loadExpenses();
}
