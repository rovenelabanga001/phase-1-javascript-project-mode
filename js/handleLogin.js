const loginForm = document.querySelector("#log-in-form");
const createAccountForm = document.querySelector("#create-account-form");

const loginContainer = document.querySelector("#login-container");
const createAccountContainer = document.querySelector(
  "#create-account-container"
);

const baseURL1 = "http://localhost:3000";

document.getElementById("show-create-account").addEventListener("click", () => {
  loginContainer.style.display = "none";
  createAccountContainer.style.display = "flex";
});

document.getElementById("show-login").addEventListener("click", () => {
  createAccountContainer.style.display = "none";
  loginContainer.style.display = "flex";
});

createAccountForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.querySelector("#create-username").value;
  const email = document.querySelector("#create-email").value;
  const password = document.querySelector("#create-password").value;

  const newUser = {
    username,
    email,
    password,
  };

  fetch(`${baseURL1}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Account created succesfully!");
      createAccountContainer.style.display = "none";
      loginContainer.style.display = "flex";
    })
    .catch((error) => console.error("Error creating account", error));
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.querySelector("#enter-username").value;
  const password = document.querySelector("#enter-password").value;
  const email = document.querySelector("#enter-email").value;

  fetch(
    `${baseURL1}/users?username=${username}&email=${email}&password=${password}`
  )
    .then((response) => response.json())
    .then((users) => {
      if (users.length > 0) {
        const user = users[0];
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Login successful!");
        loginContainer.style.display = "none";
        document.querySelector("main").style.display = "block";

        loadUserTransactions(user.id);
      } else {
        alert("Invalid Username or Password");
      }
    })
    .catch((error) => console.error("Error logging in:", error));
});

function loadUserTransactions(userId) {
  fetch(`${baseURL1}/transactions?userId=${userId}`)
    .then((response) => response.json())
    .then((transactions) => {
      //render user's transactions in the table
      const tableBody = document.querySelector("#table-body");
      tableBody.innerHTML = ""; //clears the existing transactions

      transactions.forEach((transaction) => {
        renderTransaction(transaction);
      });
    })
    .catch((error) => console.error("Error loading transactions", error));
}

document.getElementById("log-out-btn").addEventListener("click", () => {
  const currentFilter = document.querySelector(
    "#search-transcation-input"
  ).value;
  localStorage.setItem("currentFilter", currentFilter);

  localStorage.removeItem("currentUser");

  document.querySelector("main").style.display = "none";
  loginContainer.style.display = "flex";

  alert("You have been logged out!");
});

document.addEventListener("DOMContentLoaded", () => {
  //Check if user is already logged in on page load

  //   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //   if (currentUser) {
  //     loginContainer.style.display = "none";
  //     document.querySelector("main").style.display = "block";
  //     loadUserTransactions(currentUser.id);

  //     const savedFilter = localStorage.getItem("currentFilter");
  //     if (savedFilter) {
  //       document.querySelector("#search-transcation-input").value = savedFilter;
  //     }
  //   } else {}
  document.querySelector("main").style.display = "none"; //hide main content untill login
});
