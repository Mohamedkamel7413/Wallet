let users = [
  {
    name: "Ali",
    balance: 0,
    password: "123456",
    transactions: [],
  },
];

let currentUserIndex = null;

let userNameSpan = document.querySelector("#userNameSpan");
let balanceSpan = document.querySelector("#balanceSpan");
let inputPassword = document.querySelector("#inputPassword");
let inputUserName = document.querySelector("#inputUserName");
let action = document.querySelector("#action");
let table = document.querySelector("table thead");
let tableBody = document.querySelector("table tbody");

let registerInputUserName = document.querySelector("#registerInputUserName");
let registerInputPassword = document.querySelector("#registerInputPassword");
let registerInputConfirmPassword = document.querySelector(
  "#registerInputConfirmPassword"
);

let isLoggedIn = false;
let toggleBtnStatues = false;

let register = () => {
  let newUserName = registerInputUserName.value;
  let newPassword = registerInputPassword.value;
  let confirmPassword = registerInputConfirmPassword.value;

  // let isUserExists = users.some((user) => user.name === newUserName);

  if (!newUserName || !newPassword || !confirmPassword) {
    alert("Please fill all fields");
  } else if (user.name === newUserName) {
    alert("Username already exists");
  } else if (newPassword !== confirmPassword) {
    alert("Passwords do not match");
  } else {
    users.push({
      name: newUserName,
      balance: 0,
      password: newPassword,
      transactions: [],
    });

    alert("Registration successful");
  }

  registerInputUserName.value = "";
  registerInputPassword.value = "";
  registerInputConfirmPassword.value = "";
};

let showBalance = () => {
  if (currentUserIndex !== null) {
    balanceSpan.textContent = users[currentUserIndex].balance;
  }
};

let toggleButton = () => {
  if (!isLoggedIn) {
    alert("Please login first");
    return;
  }

  if (toggleBtnStatues == false) {
    toggleBtnStatues = true;
    balanceSpan.textContent = users[currentUserIndex].balance;
  } else {
    toggleBtnStatues = false;
    balanceSpan.textContent = "*****";
  }
};

let logIn = () => {
  let password = inputPassword.value;
  let userName = inputUserName.value;

  let index = users.findIndex(
    (user) => user.name === userName && user.password === password
  );

  if (index !== -1) {
    currentUserIndex = index;
    isLoggedIn = true;

    userNameSpan.textContent = users[index].name;

    if (toggleBtnStatues) {
      showBalance();
    } else {
      balanceSpan.textContent = "*****";
    }

    action.innerHTML = `        
      <div class="d-flex flex-column col-4 gap-3 p-3 border rounded bg-white">
        <h2>Choose Your Action</h2>
        <input type="number" class="form-control" placeholder="Enter amount" id="amount" />
        <button class="btn btn-warning p-1" onclick="deposit()">Deposit</button>
        <button class="btn btn-danger p-1" onclick="withdraw()">Withdraw</button>
      </div>
    `;

    table.innerHTML = ` 
      <tr>
        <td>#</td>
        <td>Before Balance</td>
        <td>Transaction Type</td>
        <td>Amount</td>
        <td>After Balance</td>
        <td>Action</td>
      </tr>
    `;

    showTransactions();
  } else {
    alert("Username or password is wrong");
  }

  inputPassword.value = "";
};

let showTransactions = () => {
  tableBody.innerHTML = "";

  let transactions = users[currentUserIndex].transactions;

  transactions.forEach((el, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${el.beforebalance}</td>
        <td>
          <p class="${el.type == "Withdraw" ? "text-danger" : "text-success"}">${el.type}</p>
        </td>
        <td>
          <p class="${el.type == "Withdraw" ? "text-danger" : "text-success"}">
          ${el.type == "Withdraw" ? "-" : "+"}${el.amount}</p>
        </td>
        <td>${el.afterbalance}</td>
        <td>
        ${
          index == transactions.length - 1
            ? `<button class="btn btn-warning" onclick="deleteTransaction(${index})">cancel</button>`
            : `.........`
        }
        </td>
      </tr>
    `;
  });
};

let deposit = () => {
  let amount = document.querySelector("#amount");
  let amountInput = +amount.value;

  if (amountInput > 0) {
    let user = users[currentUserIndex];

    let newBalance = user.balance + amountInput;

    let newTransaction = {
      beforebalance: user.balance,
      type: "Deposit",
      amount: amountInput,
      afterbalance: newBalance,
    };

    user.balance = newBalance;
    user.transactions.push(newTransaction);

    showTransactions();

    if (toggleBtnStatues) {
      showBalance();
    }
  } else {
    alert("Enter number greater than 0");
  }

  amount.value = "";
};

let withdraw = () => {
  let amount = document.querySelector("#amount");
  let amountInput = +amount.value;

  let user = users[currentUserIndex];

  if (amountInput <= user.balance && amountInput > 0) {
    let newBalance = user.balance - amountInput;

    let newTransaction = {
      beforebalance: user.balance,
      type: "Withdraw",
      amount: amountInput,
      afterbalance: newBalance,
    };

    user.balance = newBalance;
    user.transactions.push(newTransaction);

    showTransactions();

    if (toggleBtnStatues) {
      showBalance();
    }
  } else {
    alert("Invalid amount");
  }

  amount.value = "";
};

let deleteTransaction = (index) => {
  let user = users[currentUserIndex];

  user.balance = user.transactions[index].beforebalance;
  user.transactions.splice(index, 1);

  if (toggleBtnStatues) {
    showBalance();
  } else {
    balanceSpan.textContent = "*****";
  }

  showTransactions();
};