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
let lastY = 0; // To keep track of the last position

// Open the drawer
addBtn.addEventListener("click", () => {
    cardDrawer.classList.remove("translate-y-full"); // Slide up
    cardDrawer.style.transition = "transform 0.3s ease"; // Smooth transition
});

// Start dragging
const startDrag = (e) => {
    startY = e.clientY || e.touches[0].clientY;
    lastY = startY; // Set the last Y position
    isDragging = true;
    cardDrawer.style.transition = "none"; // Disable transition during drag
    document.body.style.userSelect = "none"; // Disable text selection
};

// Handle dragging movement
const handleDrag = (e) => {
    if (!isDragging) return;

    currentY = e.clientY || e.touches[0].clientY;
    const deltaY = currentY - lastY; // Calculate the movement distance
    lastY = currentY; // Update the last Y position

    // Move the drawer down dynamically
    if (deltaY > 0) {
        cardDrawer.style.transform = `translateY(${Math.min(deltaY, 200)}px)`; // Limit drag distance
    }
};

// End dragging
const endDrag = () => {
    if (!isDragging) return;

    isDragging = false;

    // If dragged down enough, close the drawer
    if (currentY - startY > 100) { // Adjust the threshold as needed
        cardDrawer.style.transform = "translateY(100%)"; // Slide down
    } else {
        // Reset position if not dragged down enough
        cardDrawer.style.transform = "translateY(0)";
    }

    // Reset touch/mouse values
    startY = 0;
    currentY = 0;

    // Re-enable text selection after dragging
    document.body.style.userSelect = "auto";
};

// Disable default browser behavior during drag
drawerLine.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevent pull-to-refresh
    startDrag(e);
});
drawerLine.addEventListener("touchmove", (e) => {
    e.preventDefault(); // Prevent page scrolling
    handleDrag(e);
});
drawerLine.addEventListener("touchend", endDrag);

// For mouse events (optional if targeting desktop as well)
drawerLine.addEventListener("mousedown", (e) => startDrag(e));
drawerLine.addEventListener("mousemove", (e) => handleDrag(e));
document.addEventListener("mouseup", endDrag);