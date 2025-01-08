const backdrop = document.getElementById("backdrop");
const body = document.querySelector("body");
const addBtn = document.getElementById("add-button");
const cardDrawer = document.getElementById("card-drawer");
const drawerLine = document.getElementById("drawer-line");
const saveCardBtn = document.getElementById("save-card");
const cardsList = document.getElementById("cards-list");

const deleteButton = document.createElement("div");
deleteButton.innerHTML = `<img src="./src/img/delete.png" alt="delete">`;
body.append(deleteButton);
deleteButton.classList.add("delete-button");
deleteButton.classList.add("hidden");

const introText = document.getElementById("intro-text");

function hideIntroText(textToHide) {
    if (cards.length > 0) {
        textToHide.classList.add("hidden");
    } else {
        textToHide.classList.remove("hidden");
    }
}

let selectedCardsCount = 0;

let cards = [];

function closeDrawer() {
    cardDrawer.classList.add("translate-y-full");
    backdrop.classList.add("hidden");
}

function formatCardNumber(input) {
    let formatted = input.replace(/\D/g, "");
    formatted = formatted.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted;
}

function addCardHandler() {
 
    const cardName = document.getElementById("card-name").value;
    const cardNumber = document.getElementById("card-number").value;
    const formattedCardNumber = formatCardNumber(cardNumber);
    const cardOwnerName = document.getElementById("card-owner-name").value;
    const cardMonth = document.getElementById("card-month").value;
    const cardYear = document.getElementById("card-year").value;
    const cardCVC = document.getElementById("card-cvc").value;

    const card = {
        cardID: Math.random(),
        cardName,
        cardNumber,
        formattedCardNumber,
        cardOwnerName,
        cardMonth,
        cardYear,
        cardCVC
    }
    cards.push(card);
    console.log(cards);

    const cardOutput = document.createElement("div");
    cardOutput.classList.add("card-output");
    cardsList.appendChild(cardOutput);

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    cardOutput.appendChild(cardHeader);

    const checkBox = document.createElement("div");
    checkBox.innerHTML = `<img src="./src/img/check_box.png" alt="check_box">`;
    checkBox.classList.add("check-box");
    checkBox.classList.add("hidden");
    cardHeader.appendChild(checkBox);

    const checkBoxOutline = document.createElement("div");
    checkBoxOutline.innerHTML = `<img src="./src/img/check_box_outline_blank.png" alt="check_box_outline_blank">`;
    checkBoxOutline.classList.add("check-box");
    cardHeader.appendChild(checkBoxOutline);

    const cardNameOutput = document.createElement("p");
    cardNameOutput.textContent = card.cardName;
    cardHeader.appendChild(cardNameOutput);

    const cardNumberWrapper = document.createElement("div");
    cardNumberWrapper.classList.add("card-number-wrapper");
    cardOutput.appendChild(cardNumberWrapper);

    const cardNumberOutput = document.createElement("h2");
    cardNumberOutput.classList.add("card-number")
    cardNumberOutput.textContent = card.formattedCardNumber;
    cardNumberWrapper.appendChild(cardNumberOutput);

    const copyIcon = document.createElement("div");
    copyIcon.classList.add("copy-icon");
    copyIcon.innerHTML = `<img src="./src/img/sticker.png" alt="copy">`;
    cardNumberWrapper.appendChild(copyIcon);

    const cardOwnerOutput = document.createElement("h2");
    cardOwnerOutput.textContent = card.cardOwnerName;
    cardOutput.appendChild(cardOwnerOutput);

    const cardDate = document.createElement("div");
    cardDate.classList.add("card-date-box");
    cardOutput.appendChild(cardDate);

    const cardMonthOutput = document.createElement("h2");
    cardMonthOutput.textContent = card.cardMonth;
    cardDate.appendChild(cardMonthOutput);

    const cardYearOutput = document.createElement("h2");
    cardYearOutput.textContent = card.cardYear;
    cardDate.appendChild(cardYearOutput);

    const cardCVCOutput = document.createElement("h2");
    cardCVCOutput.textContent = card.cardCVC;
    cardOutput.appendChild(cardCVCOutput);

    copyIcon.addEventListener("click", () => {
        // Copy the text to the clipboard
        navigator.clipboard.writeText(card.cardNumber)
        .then(() => {
          alert("Card number copied to clipboard!");
        })
        .catch(err => {
          console.error("Failed to copy card number.", err);
        });
    });

    checkBoxOutline.addEventListener("click", () => {
        checkBoxOutline.classList.add("hidden");
        checkBox.classList.remove("hidden");
        checkBox.classList.add("selected");

        selectedCardsCount++;

        if (selectedCardsCount > 0) {
            deleteButton.classList.remove("hidden");
        }
    });

    checkBox.addEventListener("click", () => {
        checkBox.classList.add("hidden");
        checkBoxOutline.classList.remove("hidden");
        checkBox.classList.remove("selected");

        selectedCardsCount--;

        if (selectedCardsCount === 0) {
            deleteButton.classList.add("hidden");
        }
    })
}

addBtn.addEventListener("click", () => {
    cardDrawer.classList.remove("translate-y-full");
    backdrop.classList.remove("hidden");

    const cardName = document.getElementById("card-name");
    const cardNumber = document.getElementById("card-number");
    const cardOwnerName = document.getElementById("card-owner-name");
    const cardMonth = document.getElementById("card-month");
    const cardYear = document.getElementById("card-year");
    const cardCVC = document.getElementById("card-cvc");

    cardName.value = "";
    cardNumber.value = "";
    cardOwnerName.value = "";
    cardMonth.value = "";
    cardYear.value = "";
    cardCVC.value = "";
});

drawerLine.addEventListener("click", closeDrawer);
backdrop.addEventListener("click", closeDrawer);

saveCardBtn.addEventListener("click", () => {
    closeDrawer();
    addCardHandler();
    hideIntroText(introText);
});

deleteButton.addEventListener("click", () => {
    const selectedCards = document.querySelectorAll(".check-box:not(.hidden)");
    selectedCards.forEach((checkbox) => {
        if (checkbox.classList.contains("selected")) {
            const cardElement = checkbox.closest(".card-output");
            const cardIndex = Array.from(cardsList.children).indexOf(cardElement);

            cards.splice(cardIndex, 1);
            cardElement.remove();
        }
    });

    selectedCardsCount = 0;
    deleteButton.classList.add("hidden");

    hideIntroText(introText);
});