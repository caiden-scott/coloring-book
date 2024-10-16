const canvas = document.getElementById('coloringPage');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementByID('colorPicker');
const imageLoader = document.getElementById('imageLoader');
const clearButton = document.getElementById('clearButton');

// Variables for drawing
let painting = false;
let brushSize = 10; // Small round brush
let brushColor = colorPicker.value;
let backgroundImage = new Image(); // Image object to store the uploaded image

// Event listener for image upload
imageLoader.addEventListener('change', handleImageUpload);

// Start drawing when mouse is pressed
canvas.addEventListener('mousedown', (e) => {
    painting = true;
    draw(e);
});

// Stop drawing when mouse is released or mouse leaves the canvas
canvas.addEventListener('mouseup', () => {
    painting = false;
    ctx.beginPath(); // End current drawing path
});

canvas.addEventListener('mouseleave', () => {
    painting = false;
    ctx.beginPath();
});

// Draw when mouse is moved
canvas.addEventListener('mousemove', draw);

// Clear the canvas drawings (keeping the image intact)
clearButton.addEventListener('click', () => {
    // Only clear the drawing, not the background image
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
});

// Function to handle the image upload
function handleImageUpload(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        backgroundImage.src = event.target.result;

        backgroundImage.onload = function() {
            // Set canvas size to match the image
            canvas.width = backgroundImage.width;
            canvas.height = backgroundImage.height;
            
            // Draw the uploaded image on the canvas
            ctx.drawImage(backgroundImage, 0, 0);

            // Show the canvas and clear button
            canvas.style.display = 'block';
            clearButton.style.display = 'block';
        };
    };
    reader.readAsDataURL(e.target.files[0]);
}

// Function for drawing on the canvas
function draw(e) {
    if (!painting) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round'; // Round brush head
    ctx.strokeStyle = brushColor;

    // Get the position of the mouse relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Draw on the canvas
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath(); // Start a new path for the next stroke
    ctx.moveTo(x, y); // Move to the new mouse position without drawing
}
