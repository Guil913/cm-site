let circleX;
let circleY;
let circleSize;
let arrowX;
let arrowSpeed;
let clickedOnGreen;
let eggImages = [];
let currentEggIndex = 0;
let won = false;
let backgroundImage;
let instrucoesImg;
let showInstructions = true;
let fadeAlpha = 255; // Variable for the black fade-in opacity

function preload() {
  backgroundImage = loadImage('art/eggbg.png');
  for (let i = 1; i <= 7; i++) {
    eggImages.push(loadImage('art/egg' + i + '.png'));
  }
  instrucoesImg = loadImage('art/instrucoes3.png'); // Load the instructions image
}

function setup() {
  createCanvas(1550, 863);
  circleX = width / 2;
  circleY = height / 2;
  circleSize = 100;
  arrowX = 100;
  arrowSpeed = 4;
  clickedOnGreen = 0;
}

function draw() {
  background(backgroundImage);
  
  if (showInstructions) {
    filter(BLUR, 5); // Apply blur to the background
  }

  noStroke();
  fill(0, 255, 0, 0);
  ellipse(circleX, circleY, circleSize);
  
  fill(255, 0, 0, 0);
  rect(arrowX, circleY - 10, 20, circleSize + 20);
  
  arrowX += arrowSpeed;
  if (arrowX >= width || arrowX <= 0) {
    arrowSpeed *= -1;
  }
  
  if (!won && mouseIsPressed && mouseX > (width - 450) / 2 && mouseX < (width + 450) / 2 && mouseY > height - 450 && mouseY < height - 50) {
    circleSize += 5;
    clickedOnGreen++;
    if (clickedOnGreen % 50 == 0) {
      currentEggIndex = min(floor(clickedOnGreen / 50), eggImages.length - 1);
    }
    if (clickedOnGreen >= 300) {
      won = true;
    }
  }
  
  textSize(26);
  fill(255);
  text("Cliques: " + clickedOnGreen, 10, height - 50);

  let imgX = (width - 550) / 2;
  let imgY = height - 450;
  image(eggImages[currentEggIndex], imgX, imgY, 500, 400);
  
  if (won) {
    textSize(32);
    fill(255, 0, 0);
    text("Ganhaste!", width / 2 - 100, height / 2);
  }

  if (showInstructions) {
    let imgX = (width - instrucoesImg.width) / 2;
    let imgY = (height - instrucoesImg.height) / 2;
    image(instrucoesImg, imgX, imgY); // Display the instructions image
  }

  // Black fade-in effect
  if (fadeAlpha > 0) {
    fill(0, fadeAlpha);
    rect(0, 0, width, height);
    fadeAlpha -= 3; // Decrease the opacity for fade-in effect
  }
}

function mouseClicked() {
  if (showInstructions) {
    showInstructions = false;
  }
}
