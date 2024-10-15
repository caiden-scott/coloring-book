const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const imageLoader = document.getElementById('imageLoader');
const colorPicker = document.getElementById('colorPicker');

let img = new Image();
let drawing = false;

// Load image from file input
imageLoader.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        img.src = e.target.result;
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
        }
    }
    reader.readAsDataURL(file);
});

// Handle mouse events for coloring
canvas.addEventListener('mousedown', (event) => {
    drawing = true;
    draw(event);
});

canvas.addEventListener('mousemove', (event) => {
    if (drawing) {
        draw(event);
    }
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    context.beginPath(); // Reset the drawing path
});

canvas.addEventListener('mouseout', () => {
    drawing = false;
    context.beginPath(); // Reset the drawing path
});

// Draw on the canvas
function draw(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    context.fillStyle = colorPicker.value;
    context.fillRect(x, y, 5, 5); // Draw a small square for coloring
}

// Change color using color picker
colorPicker.addEventListener('input', (event) => {
    context.fillStyle = event.target.value;
});
