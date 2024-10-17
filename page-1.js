window.onload = function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const imageLoader = document.getElementById('imageLoader');
    const colorPicker = document.getElementById('colorPicker');
    const clearButton = document.getElementById('clearButton');

    let painting = false;
    let brushColor = colorPicker.value;
    let image = new Image();

    // Update the brush color when the user selects a new color
    colorPicker.addEventListener('input', function () {
        brushColor = this.value;
    });

    // Load an uploaded image onto the canvas and display the canvas + button
    imageLoader.addEventListener('change', handleImageUpload);

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

    // Start painting when the mouse is pressed
    canvas.addEventListener('mousedown', function(e) {
        painting = true;
        paint(e);
    });

    // Stop painting when the mouse is released or moved out of the canvas
    canvas.addEventListener('mouseup', function() {
        painting = false;
        ctx.beginPath(); // Reset the path to avoid connecting strokes
    });

    // Paint function with a small round brush
    canvas.addEventListener('mousemove', function(e) {
        if (!painting) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.strokeStyle = brushColor;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath(); // Create a new path for the next stroke
        ctx.moveTo(x, y);
    });

    // Clear the drawings but keep the image
    clearButton.addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear all drawings
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // Redraw the image
    });
}
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath(); // Start a new path for the next stroke
    ctx.moveTo(x, y); // Move to the new mouse position without drawing
}
