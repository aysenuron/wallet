const addBtn = document.getElementById("add-button");
const cardDrawer = document.getElementById("card-drawer");
const drawerLine = document.getElementById("drawer-line");

const cardName = document.getElementById("card-name").value;
const cardNumber = document.getElementById("card-number").value;
const cardOwner = document.getElementById("card-owner").value;
const cardMonth = document.getElementById("card-month").value;
const cardYear = document.getElementById("card-year").value;
const cardCVC = document.getElementById("card-cvc").value;

let startY = 0;
let currentY = 0;
let isDragging = false;

addBtn.addEventListener("click", () => {
    cardDrawer.classList.remove("translate-y-full");
});

// Start dragging
const startDrag = (y) => {
    startY = y;
    isDragging = true;
};

// Handle dragging movement
const handleDrag = (y) => {
    if (!isDragging) return;

    currentY = y;
    const deltaY = currentY - startY;

    // Move the drawer down dynamically
    if (deltaY > 0) {
        cardDrawer.style.transform = `translateY(${deltaY}px)`;
    }
};

// End dragging
const endDrag = () => {
    if (!isDragging) return;

    isDragging = false;

    // If dragged down enough, close the drawer
    if (currentY - startY > 100) { // Adjust the threshold as needed
        cardDrawer.classList.add("translate-y-full"); // Slide down
        setTimeout(() => {
            cardDrawer.classList.add("hidden"); // Hide after animation
        }, 300); // Match the duration of the transition
    } else {
        // Reset position if not dragged down enough
        cardDrawer.style.transform = "translateY(0)";
    }

    // Reset touch/mouse values
    startY = 0;
    currentY = 0;
};

// Event listeners for touch
drawerLine.addEventListener("touchstart", (e) => startDrag(e.touches[0].clientY));
drawerLine.addEventListener("touchmove", (e) => handleDrag(e.touches[0].clientY));
drawerLine.addEventListener("touchend", endDrag);

// Event listeners for mouse
drawerLine.addEventListener("mousedown", (e) => startDrag(e.clientY));
drawerLine.addEventListener("mousemove", (e) => handleDrag(e.clientY));
document.addEventListener("mouseup", endDrag);