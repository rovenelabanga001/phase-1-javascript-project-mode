const formAddTransaction = document.querySelector("#add-transaction");
formAddTransaction.addEventListener("submit", handleSubmit);
const baseURL = "https://my-json-server.typicode.com/rovenelabanga001/phase-1-javascript-project-mode/transcations";

function handleSubmit(event) {
  event.preventDefault();
  let transactionObj = {
    type: event.target["transaction-type"].value,
    amount: event.target["transcation-amount"].value,
    category: event.target["transaction-category"].value,
    date: event.target["transaction-date"].value,
    description: event.target["transaction-description"].value,
  };
  renderTransaction(transactionObj);
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
  tableBody.appendChild(transactionBody);
}

function showEditForm(transaction) {
  const formContainer = document.getElementById(
    "edit-transaction-form-section"
  );
  //populate the form with current transaction details
  transaction.type = document.querySelector("#edit-type").value;
  transaction.amount = document.querySelector("#edit-amount").value;
  transaction.category = document.querySelector("#edit-category").value;
  transaction.description = document.querySelector("#edit-description").value;

  //show the form(current display is none to hide it)
  formContainer.style.display = "flex";

  ul = editForm.querySelector("#transaction-details-list");
  ul.appendChild(transaction.type);
}

const editForm = document.querySelector("#edit-transaction-form");
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const updateDTransaction = {
    type: e.target["edit-type"].value,
    amount: e.target["edit-amount"].value,
    category: e.target["edit-category"].value,
    description: e.target["edit-description"].value,
  };
});

function closeEditForm() {
  const formContainer = document.querySelector(
    "#edit-transaction-form-section"
  );
  formContainer.style.display = "none";
}
const closeEditFormBtn = document.querySelector("#close-form");
closeEditFormBtn.addEventListener("click", closeEditForm);

function getTransactions() {
  fetch("http://localhost:3000/transcations", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((transactionData) =>
      transactionData.forEach((transaction) => renderTransaction(transaction))
    );
}

function addTransaction(transaction) {
  fetch("http://localhost:3000/transcations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(transaction),
  })
    .then((response) => response.json())
    .then((transaction) => console.log(transaction));
}

function deleteTransaction(id) {
  fetch(`http://localhost:3000/transcations/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((transaction) => console.log(transaction));
}
document.addEventListener("DOMContentLoaded", () => {
  getTransactions();
});
