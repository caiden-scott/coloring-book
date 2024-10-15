const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const imageLoader = document.getElementById('imageLoader');
const colorPicker = document.getElementById('colorPicker');
const clearCanvasButton = document.getElementById('clearCanvas');
    let drawing = false;

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
    context.lineWidth = 5;
    context.lineCap = 'round';
    context.strokeStyle = colorPicker.value;

    context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    context.stroke();
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

// Change color using color picker
colorPicker.addEventListener('input', (event) => {
    context.fillStyle = event.target.value;

clearCanvasButton.addEventListener('click', () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
});
