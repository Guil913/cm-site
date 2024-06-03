let capture;
let threshold = 0.5; 
let overlayImage;
let button;

function preload() {
  overlayImage = loadImage("art/p5 (2).png");
}

function setup() {
  createCanvas(1550, 863);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide(); 

  button = createButton('Bruxas');
  positionButton();
  button.size(200, 50);
  button.mousePressed(goToBruxas);
  button.hide(); 
}

function draw() {
  background(255);
  image(capture, 0, 0, width, height);

  let redPixels = 0;

  capture.loadPixels();
  
  for (let i = 0; i < capture.pixels.length; i += 4) {
    let r = capture.pixels[i];
    let g = capture.pixels[i + 1];
    let b = capture.pixels[i + 2];
    
    if (r > 100 && g < 80 && b < 80) { 
      redPixels++;
    }
  }

  let redPercentage = redPixels / (capture.width * capture.height);

  // Display the percentage in the middle of the screen
  fill(0);
  textSize(50);
  textAlign(CENTER, CENTER);
  text(nf(redPercentage * 100, 2, 2) + "%", width / 2, height / 2);

  if (redPercentage >= threshold) {
    button.show();
  } else {
    button.hide(); // Hide button if below threshold
  }

  // Draw overlay image
  image(overlayImage, 0, 0, width, height);

  // Calculate opacity based on red percentage
  let redTintOpacity = redPercentage * 255;

  // Apply red tint over everything
  fill(255, 0, 0, redTintOpacity);
  rect(0, 0, width, height);
}

function goToBruxas() {
  window.location.href = "bruxas.html";
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  capture.size(width, height);
  positionButton();
}

function positionButton() {
  button.position(width / 2 - 100, height / 2 + 50);
}
