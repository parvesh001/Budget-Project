// ======= CLASS CONSTRUCTOR WITH MULTIPLE METHODS ======= //

class container {

  constructor() {
    this.budgetForm = document.getElementById("budget-form");
    this.expenseForm = document.getElementById("expense-form");
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetInput = document.getElementById("budget-input");
    this.expenseItemInput = document.getElementById("expense-item");
    this.expenseAmountInput = document.getElementById("expense-amount");
    this.budget = document.querySelector(".budget");
    this.expense = document.querySelector(".expense");
    this.balance = document.querySelector(".balance");
    this.itemList = document.querySelector(".item-list");
    this.itemsArray = [];
    this.itemId = 0;
  }


  // === BUDGET FORM SUBMIT METHOD === //
  budgetFormSubmit() {
    let value = this.budgetInput.value;

    if (!value || value < 0) {
      this.budgetFeedback.textContent =
        "value can not be empty and less than zero!!";
      this.budgetFeedback.classList.add("danger");

      let self = this;

      setTimeout(() => {
        self.budgetFeedback.textContent = "";
        self.budgetFeedback.classList.remove("danger");
      }, 2000);
    } 
    else {
      this.budget.textContent = value;
      this.budgetInput.value = "";
      this.showBalance();

    }
  }

  // === SHOW BALANCE METHOD === //
  showBalance() {
    let expense = this.totalExpense();
    let remainingBalance = parseInt(this.budget.textContent) - expense;

    this.balance.textContent = remainingBalance;

    if (remainingBalance < 0) {
      this.balance.style.color = "red";
    }
    if (remainingBalance > 0) {
      this.balance.style.color = "green";
    }
  }

  // === EXPENSE FORM SUBMIT METHOD === //
  expenseFormSubmit() { 
    let item = this.expenseItemInput.value;
    let amount = this.expenseAmountInput.value;

    if (item === "" || !amount || amount < 0) {
      this.expenseFeedback.textContent =
        "value can not be empty and less than zero!!";
      this.expenseFeedback.classList.add("danger");

      let self = this;
      setTimeout(() => {
        self.expenseFeedback.textContent = "";
        self.expenseFeedback.classList.remove("danger");
      }, 2000);
      
    } else {
      amount = parseInt(amount);

      this.expenseItemInput.value = "";
      this.expenseAmountInput.value = "";

      let expense = {
        id: this.itemId,
        item,
        amount,
      };

      this.itemId++;

      this.itemsArray.push(expense);
  
      let listTag = document.createElement("li");
      listTag.className = "list-item";
      listTag.innerHTML = `<p class="item">${expense.item}</p>
            <p class="amount">${expense.amount}</p>
            <div class="icons">
                <i class="fa-regular fa-edit" data-id = ${expense.id}></i>
                <i class="fa-regular fa-trash-alt" data-id = ${expense.id}></i>
            </div>`;
      this.itemList.appendChild(listTag);

      this.showBalance();
    }
  }

  // === TOTAL EXPENSE CALUCULATION METHOD === //
  totalExpense() {
    let total = this.itemsArray.reduce((acc, curr) => {
      acc += curr.amount;
      return acc;
    }, 0);

    this.expense.textContent = total;
    return total;
  }

  // === EDIT BUTTON METHOD === //
  editBtn(element) {
    let id = parseInt(element.dataset.id);

    let parentEl = element.parentElement.parentElement;
    this.itemList.removeChild(parentEl);

    //add to form
    let expense = this.itemsArray.filter((item) => {
        return item.id == id;
    });

     
    this.expenseItemInput.value = expense[0].item;
    this.expenseAmountInput.value = expense[0].amount;

    //remove from item array
    let filteredItemsArr = this.itemsArray.filter(item => {
        return item.id !== id;
    });

    this.itemsArray = filteredItemsArr;
    //show balance 
    this.showBalance();
  }

  // === DELETE BUTTON METHOD === //
  delBtn(element) {
    let id = parseInt(element.dataset.id);
    let parentEl = element.parentElement.parentElement;
    this.itemList.removeChild(parentEl);
    //remove from item array
    //remove from list
    let filteredItemsArr = this.itemsArray.filter(item => {
        return item.id !== id;
    })
    this.itemsArray = filteredItemsArr;
    //show balance method
    this.showBalance();
  }
}

// ======= END OF CLASS CONSTRUCTOR WITH MULTIPLE METHODS ======= //

// ====== EVENT LISTENERS FUNCTIONS =====//
function eventlistners() {
  const ui = new container();

  // === event on budget form == //
  ui.budgetForm.addEventListener("submit", (event) => {
    event.preventDefault();
    ui["budgetFormSubmit"](); //ES6 way of calling method
  });

  // === event on expense form == //
  ui.expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    ui.expenseFormSubmit(); // old way of calling method
  });

  // === event on item-list == //
  ui.itemList.addEventListener("click", (item) => {
    if (item.target.classList.contains("fa-edit")) {
        ui["editBtn"](item.target);
    } else if (item.target.classList.contains("fa-trash-alt")) { 
        ui["delBtn"](item.target);
    }
  });
}
// ====== END OF EVENT LISTENERS FUNCTIONS =====//


// ====== CALLING ALL AFOREMENTIONED EVENTS ON WINDOW LOAD ===== //
window.addEventListener("DOMContentLoaded", () => {
  eventlistners();
});
// ====== END OF CALLING ALL AFOREMENTIONED EVENTS ON WINDOW LOAD ===== //
