const backdrop = document.getElementById("backdrop");
const addBtn = document.getElementById("add-button");
const cardDrawer = document.getElementById("card-drawer");
const drawerLine = document.getElementById("drawer-line");
const saveCardBtn = document.getElementById("save-card");
const cardsList = document.getElementById("cards-list");

let cards = [];

function closeDrawer() {
    cardDrawer.classList.add("translate-y-full");
    backdrop.classList.add("hidden");
}

function addCardHandler() {
    const cardName = document.getElementById("card-name").value;
    const cardNumber = document.getElementById("card-number").value;
    const cardOwner = document.getElementById("card-owner").value;
    const cardMonth = document.getElementById("card-month").value;
    const cardYear = document.getElementById("card-year").value;
    const cardCVC = document.getElementById("card-cvc").value;

    const card = {
        cardID: Math.random(),
        cardName,
        cardNumber,
        cardOwner,
        cardMonth,
        cardYear,
        cardCVC
    }
    cards.push(card);
    console.log(cards);

    const cardOutput = document.createElement("div");
    cardOutput.classList.add("card-output");
    cardsList.append(cardOutput);

    const cardNameOutput = document.createElement("h2");
    cardNameOutput.textContent = card.cardName;
    cardOutput.append(cardNameOutput);

    const cardNumberOutput = document.createElement("h2");
    cardNumberOutput.classList.add("card-number")
    cardNumberOutput.textContent = card.cardNumber;
    cardOutput.append(cardNumberOutput);

    const cardOwnerOutput = document.createElement("h2");
    cardOwnerOutput.textContent = card.cardOwner;
    cardOutput.append(cardOwnerOutput);

    const cardDate = document.createElement("div");
    cardDate.classList.add("card-date-box");
    cardOutput.append(cardDate);

    const cardMonthOutput = document.createElement("h2");
    cardMonthOutput.textContent = card.cardMonth;
    cardDate.append(cardMonthOutput);

    const cardYearOutput = document.createElement("h2");
    cardYearOutput.textContent = card.cardYear;
    cardDate.append(cardYearOutput);

    const cardCVCOutput = document.createElement("h2");
    cardCVCOutput.textContent = card.cardCVC;
    cardOutput.append(cardCVCOutput);
}

addBtn.addEventListener("click", () => {
    cardDrawer.classList.remove("translate-y-full");
    backdrop.classList.remove("hidden");

    const cardName = document.getElementById("card-name").value;
    const cardNumber = document.getElementById("card-number").value;
    const cardOwner = document.getElementById("card-owner").value;
    const cardMonth = document.getElementById("card-month").value;
    const cardYear = document.getElementById("card-year").value;
    const cardCVC = document.getElementById("card-cvc").value;

    cardName.innerHTML = "";
    cardNumber.innerHTML = "";
    cardOwner.innerHTML = "";
    cardMonth.innerHTML = "";
    cardYear.innerHTML = "";
    cardCVC.innerHTML = "";
});

drawerLine.addEventListener("click", closeDrawer);
backdrop.addEventListener("click", closeDrawer);

saveCardBtn.addEventListener("click", () => {
    closeDrawer();
    addCardHandler();
});