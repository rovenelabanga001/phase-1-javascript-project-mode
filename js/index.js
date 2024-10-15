const formAddTransaction = document.querySelector("#add-transaction");
formAddTransaction.addEventListener("submit", handleSubmit);

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
    deleteTransaction(transaction.id)
  });
  tableBody.appendChild(transactionBody);
}

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
