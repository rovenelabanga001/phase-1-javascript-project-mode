const formAddTransaction = document.querySelector("#add-transaction");
formAddTransaction.addEventListener("submit", handleSubmit);

const baseURL = " https://phase-1-javascript-project-mode.onrender.com/transactions";
let transactions = [];

function handleSubmit(event) {
  event.preventDefault();
  let transactionObj = {
    type: event.target["transaction-type"].value,
    amount: event.target["transcation-amount"].value,
    category: event.target["transaction-category"].value,
    date: event.target["transaction-date"].value,
    description: event.target["transaction-description"].value,
  };
  // renderTransaction(transactionObj);
  addTransaction(transactionObj);

  event.target.reset();
}

function renderTransaction(transaction) {
  const tableBody = document.querySelector("#table-body");
  const transactionBody = document.createElement("tr");

  transactionBody.classList.add("transaction-body");

  transactionBody.innerHTML = `
        <td class="t-type">${transaction.type}</td>
        <td class="t-category">${transaction.category}</td>
        <td class="t-date">${transaction.date}</td>
        <td class="t-amount">${transaction.amount}</td>
        <td class="t-description">${transaction.description}</td>
        <td>
            <button class="delete" id="delete-transaction">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
  `;

  const deleteTransactionButton = transactionBody.querySelector(
    "#delete-transaction"
  );
  deleteTransactionButton.addEventListener("click", (e) => {
    e.target.closest(".transaction-body").remove();
    e.stopPropagation();
    deleteTransaction(transaction.id);
  });
  transactionBody.addEventListener("click", () => {
    //call showEditForm here
    showEditForm(transaction);
  });

  tableBody.appendChild(transactionBody);
}

function showEditForm(transaction) {
  const formContainer = document.getElementById(
    "edit-transaction-form-section"
  );
  //populate the form with current transaction details
  document.querySelector("#edit-type").value = transaction.type;
  document.querySelector("#edit-amount").value = transaction.amount;
  document.querySelector("#edit-category").value = transaction.category;
  document.querySelector("#edit-description").value = transaction.description;

  //show the form(current display is none to hide it)
  formContainer.style.display = "flex";

  const editForm = document.querySelector("#edit-transaction-form");
  editForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const updatedTransaction = {
      type: event.target["edit-type"].value,
      amount: event.target["edit-amount"].value,
      category: event.target["edit-category"].value,
      description: event.target["edit-description"].value,
    };
    updateTransaction(transaction.id, updatedTransaction);
    closeEditForm();
  });
}

function closeEditForm() {
  const formContainer = document.querySelector(
    "#edit-transaction-form-section"
  );
  formContainer.style.display = "none";
}
const closeEditFormBtn = document.querySelector("#close-form");
closeEditFormBtn.addEventListener("click", closeEditForm);

function getTransactions() {
  fetch(baseURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((transactionData) => {
      transactions = transactionData;
      transactionData.forEach((transaction) => renderTransaction(transaction));
      updateTransactionSummaryFromTable();
    })
    .catch((error) => console.error("Error fetching transactions:", error));
}

function addTransaction(transaction) {
  fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(transaction),
  })
    .then((response) => response.json())
    .then((newTransaction) => {
      transactions.push(newTransaction);
      renderTransaction(newTransaction);
      updateTransactionSummaryFromTable();
    })
    .catch((error) => console.error("Error adding transaction:", error));
}

function deleteTransaction(id) {
  fetch(`${baseURL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => {
      transactions = transactions.filter(
        (transaction) => transaction.id !== id
      ); // Update local state
      console.log(`Deleted transaction with id: ${id}`);
    })
    .catch((error) => console.error("Error deleting transaction:", error));
}

function updateTransaction(id, updatedTransaction) {
  console.log(id);
  fetch(`${baseURL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(updatedTransaction),
  })
    .then((response) => response.json())
    .then((transaction) => {
      console.log("Transaction updated:", transaction);
      location.reload();
    })
    .catch((error) => console.error("Error updating transaction:", error));
}
function getDate() {
  const dateElement = document.querySelector("#date-today");
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = today.toLocaleDateString("en-US", options);
  dateElement.textContent = formattedDate;
}

function handleSearch(event) {
  const searchItem = event.target.value.toLowerCase();

  const transactionRows = document.querySelectorAll(".transaction-body");
  transactionRows.forEach((row) => {
    const category = row.querySelector(".t-category").textContent.toLowerCase();
    const type = row.querySelector(".t-type").textContent.toLowerCase();

    if (category.includes(searchItem) || type.includes(searchItem)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

function updateTransactionSummaryFromTable() {
  const incomeTotalElement = document.querySelector("#income-summary");
  const expenseTotalElement = document.querySelector("#expense-summary");
  const balanceElement = document.querySelector("#balance");

  const transactionRows = document.querySelectorAll(".transaction-body");
  let totalIncome = 0;
  let totalExpenses = 0;

  transactionRows.forEach((row) => {
    const typeCell = row.querySelector(".t-type");
    const amountCell = row.querySelector(".t-amount");

    const type = typeCell.textContent.trim();
    const amount = parseFloat(amountCell.textContent.replace(/,/g, ""));

    if (type === "Income") {
      totalIncome += amount;
    } else if (type === "Expense") {
      totalExpenses += amount;
    }

    const balance = totalIncome - totalExpenses;

    incomeTotalElement.textContent = totalIncome.toLocaleString();
    expenseTotalElement.textContent = totalExpenses.toLocaleString();
    balanceElement.textContent = balance.toLocaleString();

    if (balance < 0) {
      balanceElement.style.color = "red"; // Set font color to red
    } else {
      balanceElement.style.color = "rgb(45, 188, 45)";
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-transcation");
  const filterForm = document.getElementById("filter-by-type");
  searchForm.addEventListener("input", handleSearch);
  getTransactions();
  getDate();
});
