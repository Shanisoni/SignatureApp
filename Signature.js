 // JavaScript code for additional functionalities
 let history = [];
 const canvas = document.getElementById('myCanvas');
 const ctx = canvas.getContext('2d');

 // Initialize drawing properties
 let isDrawing = false;
 let lastX = 0;
 let lastY = 0;

 // Function to draw on the canvas
 function draw(event) {
     if (!isDrawing) return;
     ctx.beginPath();
     ctx.moveTo(lastX, lastY);
     ctx.lineTo(event.offsetX, event.offsetY);
     ctx.stroke();
     lastX = event.offsetX;
     lastY = event.offsetY;
 }

 // Event listeners for mouse actions
 canvas.addEventListener('mousedown', (event) => {
     isDrawing = true;
     lastX = event.offsetX;
     lastY = event.offsetY;
     draw(event);
 });

 canvas.addEventListener('mousemove', draw);

 canvas.addEventListener('mouseup', () => {
     isDrawing = false;
 });

 canvas.addEventListener('mouseout', () => {
     isDrawing = false;
 });

 canvas.addEventListener('contextmenu', (event) => {
     event.preventDefault();
 });

 // Function to clear the canvas
 function clearCanvas() {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
 }

 // Event listener for the clear button
 document.getElementById('clearButton').addEventListener('click', clearCanvas);

 // Function to undo the last drawing action
 function undo() {
     history.pop(); // Remove the last drawn path from history
     clearCanvas(); // Clear the canvas
     history.forEach(path => ctx.stroke(path)); // Redraw all remaining paths
 }

 // Event listener for the undo button
 document.getElementById('undoButton').addEventListener('click', undo);

 // Function to save the canvas as an image
 function saveCanvas() {
     let link = document.createElement('a');
     link.download = 'my-canvas.png';
     link.href = canvas.toDataURL();
     link.click();
 }

 // Event listener for the save button
 document.getElementById('saveButton').addEventListener('click', saveCanvas);

 // Function to retrieve a saved signature
 function retrieveSignature() {
     let savedCanvas = localStorage.getItem('canvasContents');
     if (savedCanvas) {
         let img = new Image();
         img.src = savedCanvas;
         img.onload = () => {
             ctx.drawImage(img, 0, 0);
         };
     }
 }

 // Event listener for the retrieve button
 document.getElementById('retrieveButton').addEventListener('click', retrieveSignature);

 // Function to change the color of the drawing tool
 function changeColor(event) {
     ctx.strokeStyle = event.target.value;
     ctx.fillStyle = event.target.value;
 }

 // Event listener for the color picker
 document.getElementById('colorPicker').addEventListener('change', changeColor);

 // Function to change the line width
 function changeLineWidth(event) {
     ctx.lineWidth = event.target.value;
 }

 // Event listener for the line width slider
 document.getElementById('lineWidthSlider').addEventListener('input', changeLineWidth);

 // Function to change the font size
 function changeFontSize(event) {
     ctx.font = `${event.target.value}px ${fontPicker.value}`;
 }

 // Event listener for the font size picker
 document.getElementById('fontSizePicker').addEventListener('change', changeFontSize);

 // Function to add dynamic buttons
 function addDynamicButton(text, clickHandler) {
     const button = document.createElement('button');
     button.textContent = text;
     button.className = 'btn btn-secondary'; // Bootstrap button styling
     button.addEventListener('click', clickHandler);
     document.querySelector('.bottom').appendChild(button);
 }

 // Add dynamic buttons
 addDynamicButton('Clear Text', () => {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
 });

 addDynamicButton('Change Background', () => {
     const canvasColor = document.getElementById('canvasColor').value;
     ctx.fillStyle = canvasColor;
     ctx.fillRect(0, 0, canvas.width, canvas.height);
 });



 



























 