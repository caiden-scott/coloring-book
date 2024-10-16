const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const imageLoader = document.getElementById('imageLoader');
const clearBtn = document.getElementById('clearBtn');

let painting = false;
let brushColor = colorPicker.value;
let brushSize = 10; // Small round brush head

// Load an image onto the canvas
imageLoader.addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            // Clear the canvas before drawing a new image
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});

// Set the brush color when the color picker is changed
colorPicker.addEventListener('input', function() {
    brushColor = this.value;
});

// Mouse down event starts painting
canvas.addEventListener('mousedown', function(e) {
    painting = true;
    draw(e);
});

// Mouse up event stops painting
canvas.addEventListener('mouseup', function() {
    painting = false;
    ctx.beginPath(); // Begin a new path so lines don't connect
});

// Mouse move event paints on the canvas
canvas.addEventListener('mousemove', draw);

function draw(e) {
    if (!painting) return;

    // Get the mouse position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set brush style and draw a circle
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Clear the canvas drawings
clearBtn.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
