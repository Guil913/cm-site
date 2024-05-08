let capture;
let threshold = 0.5; // Threshold for detecting red
let button;

function setup() {
  createCanvas(1080, 760);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide(); // Hide the video feed

  // Create the button
  button = createButton('Bruxas');
  button.position(width / 2 - 100, height / 2);
  button.size(200, 50);
  button.mousePressed(goToBruxas);
  button.hide(); // Initially hide the button
}

function draw() {
  background(255);
  image(capture, 0, 0, width, height);

  let redPixels = 0;

  // Load pixels of the video feed
  capture.loadPixels();
  
  // Loop through all pixels and count red ones
  for (let i = 0; i < capture.pixels.length; i += 4) {
    let r = capture.pixels[i];
    let g = capture.pixels[i + 1];
    let b = capture.pixels[i + 2];
    
    // Check if the pixel is mostly red
    if (r > 100 && g < 80 && b < 80) { // Adjust these thresholds as needed
      redPixels++;
    }
  }

  // Calculate the percentage of red pixels
  let redPercentage = redPixels / (capture.width * capture.height);

  // Display the red percentage
  fill(0);
  textSize(20);
  text("Red percentage: " + nf(redPercentage * 100, 2, 2) + "%", 20, 30);

  // Check if the red percentage exceeds the threshold
  if (redPercentage >= threshold) {
    // Show the button if it's not already visible
    button.show();
  }
}

function goToBruxas() {
  window.location.href = "bruxas.html";
}
