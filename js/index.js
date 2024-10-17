const formAddTransaction = document.querySelector("#add-transaction");
formAddTransaction.addEventListener("submit", handleSubmit);

const baseURL = "http://localhost:3000/transactions";
const transactions = [];

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
}

function renderTransaction(transaction) {
  const tableBody = document.querySelector("#table-body");
  const transactionBody = document.createElement("tr");

  transactionBody.classList.add("transaction-body");

  transactionBody.innerHTML = `
        <td>${transaction.type}</td>
        <td>${transaction.category}</td>
        <td>${transaction.date}</td>
        <td>${transaction.amount}</td>
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

  const editForm = document.querySelector("#edit-transaction-form");
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedTransaction = {
      type: e.target["edit-type"].value,
      amount: e.target["edit-amount"].value,
      category: e.target["edit-category"].value,
      description: e.target["edit-description"].value,
    };
    updateTransaction(transaction.id, updatedTransaction);
    closeEditForm();
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
    .then((transactionData) =>
      transactionData.forEach((transaction) => renderTransaction(transaction))
    )
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
      getTransactions.push(newTransaction);
      renderTransaction(newTransaction);
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
document.addEventListener("DOMContentLoaded", () => {
  getTransactions();
  getDate();
});
