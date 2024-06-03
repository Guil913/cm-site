let capture;
let threshold = 0.5; 
let overlayImage;
let button;

function preload() {
  overlayImage = loadImage("art/p5 (6).png");
}

function setup() {
  createCanvas(1550, 863);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide(); 

  button = createButton('Fadas');
  positionButton();
  button.size(200, 50);
  button.mousePressed(goToDuende);
  button.hide(); 
}

function draw() {
  background(255);
  image(capture, 0, 0, width, height);

  let greenPixels = 0;

  capture.loadPixels();
  
  for (let i = 0; i < capture.pixels.length; i += 4) {
    let r = capture.pixels[i];
    let g = capture.pixels[i + 1];
    let b = capture.pixels[i + 2];
    
    let hsl = rgbToHsl(r, g, b);
    let hue = hsl[0]; 

    if (hue >= 80 && hue <= 160) {
      greenPixels++;
    }
  }

  let greenPercentage = greenPixels / (capture.width * capture.height);

  // Display the percentage in the middle of the screen
  fill(0);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(nf(greenPercentage * 100, 2, 2) + "%", width / 2, height / 2);

  if (greenPercentage >= threshold) {
    button.show();
  } else {
    button.hide();
  }

  // Draw overlay image
  image(overlayImage, 0, 0, width, height);

  // Calculate opacity based on green percentage
  let greenTintOpacity = greenPercentage * 255;

  // Apply green tint over everything
  fill(128, 0, 128, greenTintOpacity);
  rect(0, 0, width, height);
}

function goToDuende() {
  window.location.href = "neve.html";
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  capture.size(width, height);
  positionButton();
}

function positionButton() {
  button.position(width / 2 - 100, height / 2 + 50);
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  let max = Math.max(r, g, b),
      min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; 
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
