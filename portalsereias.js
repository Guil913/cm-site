let capture;
let threshold = 0.5; // Threshold for detecting orange
let button;

function setup() {
  createCanvas(1080, 760);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide(); // Hide the video feed

  // Create the button
  button = createButton('Sereias');
  button.position(width / 2 - 100, height / 2);
  button.size(200, 50);
  button.mousePressed(goToBruxas);
  button.hide(); // Initially hide the button
}

function draw() {
  background(255);
  image(capture, 0, 0, width, height);

  let orangePixels = 0;

  // Load pixels of the video feed
  capture.loadPixels();
  
  // Loop through all pixels and count orange ones
  for (let i = 0; i < capture.pixels.length; i += 4) {
    let r = capture.pixels[i];
    let g = capture.pixels[i + 1];
    let b = capture.pixels[i + 2];
    
    // Convert RGB to HSL color space
    let hsl = rgbToHsl(r, g, b);
    let hue = hsl[0]; // Hue component

    // Check if the hue corresponds to orange (approximate range)
    if ((hue >= 20 && hue <= 40) || (hue >= 320 && hue <= 360)) {
      orangePixels++;
    }
  }

  // Calculate the percentage of orange pixels
  let orangePercentage = orangePixels / (capture.width * capture.height);

  // Display the orange percentage
  fill(0);
  textSize(20);
  text("Orange percentage: " + nf(orangePercentage * 100, 2, 2) + "%", 20, 30);

  // Check if the orange percentage exceeds the threshold
  if (orangePercentage >= threshold) {
    // Show the button if it's not already visible
    button.show();
  } else {
    // Hide the button if the orange percentage drops below the threshold
    button.hide();
  }
}

function goToBruxas() {
  window.location.href = "sereias.html";
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
