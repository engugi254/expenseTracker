const balance = document.querySelector("#balance");
const inc_amt = document.querySelector("#inc-amt");
const exp_amt = document.querySelector("#exp-amt");
const trans = document.querySelector("#trans");
const form = document.querySelector("#form");
const description = document.querySelector("#desc");
const amount = document.querySelector("#amount");


const localStorageTrans = JSON.parse(localStorage.getItem("trans"));
let transactions = localStorage.getItem("trans") !== null ? localStorageTrans : [];

function loadTransactionDetails(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "exp" : "inc");
  item.innerHTML = `
    ${transaction.description}
    <span>${sign} ${Math.abs(transaction.amount)}</span>
    <button class="btn-del" onclick="removeTrans(${transaction.id})">x</button>
  `;
  trans.appendChild(item);
  //console.log(transaction);
}

function removeTrans(id) {
  if (confirm("Are you sure you want to delete Transcation?")) {
    transactions = transactions.filter((transaction) => transaction.id != id);
    config();
    updateLocalStorage();
  } else {
    return;
  }
}


function config() {
  trans.innerHTML = "";
  transactions.forEach(loadTransactionDetails);
  updateAmount();
}

function addTransaction(e) {
  e.preventDefault();
  if (description.value.trim() == "" || amount.value.trim() == "") {
    alert("Please Enter Description and amount");
  } else {
    const transaction = {
      id: uniqueId(),
      description: description.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    loadTransactionDetails(transaction);
    description.value = "";
    amount.value = "";
    updateAmount();
    updateLocalStorage();
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 40000000);
}

form.addEventListener("submit", addTransaction);

window.addEventListener("load", function () {
  config();
});

function updateLocalStorage() {
  localStorage.setItem("trans", JSON.stringify(transactions));
}