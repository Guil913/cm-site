let capture;
let threshold = 0.5; // Threshold for detecting purple (50%)
let button;
let buttonShown = false; // Flag to track if the button has been shown
let peakPercentage = 0; // Track peak purple percentage

function setup() {
  createCanvas(1080, 760);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide(); // Hide the video feed

  // Create the button
  button = createButton('Gigantes');
  button.position(width / 2 - 100, height / 2);
  button.size(200, 50);
  button.mousePressed(goToBruxas);
  button.hide(); // Initially hide the button
}

function draw() {
  background(255);
  image(capture, 0, 0, width, height);

  let purplePixels = 0;

  // Load pixels of the video feed
  capture.loadPixels();
  
  // Loop through all pixels and count purple ones
  for (let i = 0; i < capture.pixels.length; i += 4) {
    let r = capture.pixels[i];
    let g = capture.pixels[i + 1];
    let b = capture.pixels[i + 2];
    
    // Convert RGB to HSL color space
    let hsl = rgbToHsl(r, g, b);
    let hue = hsl[0]; // Hue component

    // Check if the hue corresponds to purple (expanded range)
    if (hue >= 260 && hue <= 320) {
      purplePixels++;
    }
  }

  // Calculate the percentage of purple pixels
  let purplePercentage = purplePixels / (capture.width * capture.height);

  // Update peak percentage
  if (purplePercentage > peakPercentage) {
    peakPercentage = purplePercentage;
    console.log("Peak purple percentage:", peakPercentage);
  }

  // Display the purple percentage
  fill(0);
  textSize(20);
  text("Purple percentage: " + nf(purplePercentage * 100, 2, 2) + "%", 20, 30);

  // Show the button if the purple percentage exceeds the threshold and the button hasn't been shown before
  if (purplePercentage >= threshold && !buttonShown) {
    button.show();
    buttonShown = true; // Set the flag to true indicating that the button has been shown
  }
}

function goToBruxas() {
  window.location.href = "neve.html";
}

// Function to convert RGB to HSL color space
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  let max = Math.max(r, g, b),
      min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s, l];
}
