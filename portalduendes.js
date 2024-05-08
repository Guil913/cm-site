let capture;
let threshold = 0.5; // Threshold for detecting green
let button;

function setup() {
  createCanvas(1080, 760);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide(); // Hide the video feed

  // Create the button
  button = createButton('Duendes');
  button.position(width / 2 - 100, height / 2);
  button.size(200, 50);
  button.mousePressed(goToBruxas);
  button.hide(); // Initially hide the button
}

function draw() {
  background(255);
  image(capture, 0, 0, width, height);

  let greenPixels = 0;

  // Load pixels of the video feed
  capture.loadPixels();
  
  // Loop through all pixels and count green ones
  for (let i = 0; i < capture.pixels.length; i += 4) {
    let r = capture.pixels[i];
    let g = capture.pixels[i + 1];
    let b = capture.pixels[i + 2];
    
    // Convert RGB to HSL color space
    let hsl = rgbToHsl(r, g, b);
    let hue = hsl[0]; // Hue component

    // Check if the hue corresponds to green (expanded range)
    if (hue >= 80 && hue <= 160) {
      greenPixels++;
    }
  }

  // Calculate the percentage of green pixels
  let greenPercentage = greenPixels / (capture.width * capture.height);

  // Display the green percentage
  fill(0);
  textSize(20);
  text("Green percentage: " + nf(greenPercentage * 100, 2, 2) + "%", 20, 30);

  // Show the button if the green percentage exceeds the threshold
  if (greenPercentage >= threshold) {
    button.show();
  }
}

function goToBruxas() {
  window.location.href = "duende.html";
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