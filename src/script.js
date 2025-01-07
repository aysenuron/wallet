const addBtn = document.getElementById("add-button");
const cardDrawer = document.getElementById("card-drawer");
const drawerLine = document.getElementById("drawer-line");

const cardName = document.getElementById("card-name").value;
const cardNumber = document.getElementById("card-number").value;
const cardOwner = document.getElementById("card-owner").value;
const cardMonth = document.getElementById("card-month").value;
const cardYear = document.getElementById("card-year").value;
const cardCVC = document.getElementById("card-cvc").value;


addBtn.addEventListener("click", () => {
    cardDrawer.classList.remove("translate-y-full");
});

drawerLine.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY; // Record the starting Y position
    isDragging = true;
});

drawerLine.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    currentY = e.touches[0].clientY; // Track the current Y position
    const deltaY = currentY - startY;

    // Move the drawer down dynamically based on touch movement
    if (deltaY > 0) {
        cardDrawer.style.transform = `translateY(${deltaY}px)`;
    }
});

drawerLine.addEventListener("touchend", () => {
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

    // Reset touch values
    startY = 0;
    currentY = 0;
});