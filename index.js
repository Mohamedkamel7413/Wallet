let userInfo = {
  name: "Ali",
  balance: 0,
  password: "123456",
  transactions: [],
};
let userNameSpan = document.querySelector("#userNameSpan");
let balanceSpan = document.querySelector("#balanceSpan");
let inputPassword = document.querySelector("#inputPassword");
let inputUserName = document.querySelector("#inputUserName");
let action = document.querySelector("#action");

let elPrice = document.querySelector("#before");
let elDisscount = document.querySelector("#after");
let inputBefore = document.querySelector("#inputBefore");
let inputAfter = document.querySelector("#inputAfter");
let table = document.querySelector("table thead");
let tableBody = document.querySelector("table tbody");

let showBalance = () => {
  balanceSpan.textContent = userInfo.balance;
};

let logIn = () => {
  let password = inputPassword.value;
  let userName = inputUserName.value;
  if (password == userInfo.password && userName == userInfo.name) {
    showBalance();
    userNameSpan.textContent = userInfo.name;
    action.innerHTML = `        
        <div class="d-flex flex-column col-4 gap-3 p-3 border rounded bg-white">
        <h2>Choose Your Action</h2>
        <input type="number" class="form-control" placeholder="Enter amount" id = "amount" />
        <button class="btn btn-warning p-1" onclick = "deposit ()">Deposit</button>
        <button class="btn btn-danger p-1"  onclick = "withdraw ()">
          Withdraw
        </button>
      </div>
          <div class="container d-flex justify-content-center py-4">
      `;
    table.innerHTML += ` 
            <tr>
              <td>#</td>
              <td>Before Balance</td>
              <td>Transaction Type</td>
              <td>Amount</td>
              <td>After Balance</td>
              <td>Action</td>
            </tr>
`;
  } else {
    alert("password wrong");
  }
  inputPassword.value = "";
};
let showTransactions = () => {
  tableBody.innerHTML = "";
  userInfo.transactions.forEach((el, index) => {
    tableBody.innerHTML += `
            <tr>
              <td>${index + 1}</td>
              <td>${el.beforebalance}</td>
              <td><p class="${el.type == "Withdraw" ? "text-danger" : "text-success"}">${el.type}</p></td>
              <td>
                <p class="${el.type == "Withdraw" ? "text-danger" : "text-success"}">${el.type == "Withdraw" ? "-" : "+"}${el.amount}</p>              
              </td>
              <td>${el.afterbalance}</td>
              <td>
              ${index == userInfo.transactions.length - 1 ? `<button class="btn btn-warning" onclick="deleteTransaction(${index})"> cancel </button>` : `.........`}
              </td>
            </tr>
    `;
  });
};

let deposit = () => {
  let amount = document.querySelector("#amount");
  let amountInput = +amount.value;
  if (amountInput > 0) {
    let newBalance = userInfo.balance + amountInput;
    let newTransaction = {
      beforebalance: userInfo.balance,
      type: "Deposite",
      amount: amountInput,
      afterbalance: newBalance,
    };
    userInfo.balance = newBalance;
    userInfo.transactions.push(newTransaction);
    showTransactions();
    showBalance();
  } else {
    alert("Enter number greaterthan 0");
  }
  amount.value = "";
};

let withdraw = () => {
  let amount = document.querySelector("#amount");
  let amountInput = +amount.value;
  if (amountInput <= userInfo.balance && amountInput > 0) {
    let newBalance = userInfo.balance - amountInput;
    let newTransaction = {
      beforebalance: userInfo.balance,
      type: "Withdraw",
      amount: amountInput,
      afterbalance: newBalance,
    };
    userInfo.balance = newBalance;
    userInfo.transactions.push(newTransaction);
    showTransactions();
    showBalance();
  } else {
    alert("withdraw it's less than amount or you enter amount less than 0 ");
  }
  amount.value = "";
};
let deleteTransaction = (index) => {

  userInfo.balance = userInfo.transactions[index].beforebalance;

  userInfo.transactions.splice(index, 1);

  showBalance();
  showTransactions();
};
