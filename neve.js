let images = [];
let timer = 0;
let interval = 2500;
let showingImages = false;
let gameOver = false;
let imagePositions = [];
let gameStarted = false;
let snowBackground;
let showInstructions = true;
let fadeAlpha = 255; // Variable for the black fade-in opacity
let instrucoesImg; // Variable for the instructions image

function preload() {
  for (let i = 1; i <= 7; i++) {
    images.push(loadImage(`art/c${i}.png`));
  }
  snowBackground = loadImage("art/snow2.png");
  instrucoesImg = loadImage('art/instrucoes6.png'); // Load the instructions image
}

function setup() {
  createCanvas(1550, 863);
  timer = millis();
  textAlign(CENTER, CENTER);
}

function draw() {
  image(snowBackground, 0, 0, width, height);

  if (showInstructions) {
    filter(BLUR, 5); // Apply blur to the background
  }

  if (gameOver) {
    fill(0);
    textSize(32);
    text("Ganhaste!", width / 2, height / 2);
    return;
  }

  if (!gameStarted && !showInstructions) {
    fill(0);
    textSize(44);
    text("Carrega para Começar", width / 2, height / 2);
    return;
  }

  for (let i = 0; i < imagePositions.length; i++) {
    let pos = imagePositions[i];
    if (showingImages || pos.clicked) {
      if (pos.clicked) {
        stroke(255, 0, 0);
      } else {
        stroke(0, 255, 0, 0);
      }
      strokeWeight(2);
      noFill();
      rect(pos.x - 50, pos.y - 50, 60, 60);
    }
    if (showingImages) {
      image(images[i], pos.x - 50, pos.y - 50, 60, 60);
    }
  }

  if (millis() - timer >= interval) {
    timer = millis();
    showingImages = !showingImages;

    imagePositions = [];
    let attempts = 0;
    while (imagePositions.length < 7 && attempts < 100) {
      let x = random(500, 1240);
      let y = random(650, 800);
      if (!tooClose(x, y, imagePositions)) {
        imagePositions.push({ x: x, y: y, clicked: false });
      }
      attempts++;
    }
  }

  let redCount = 0;
  for (let i = 0; i < imagePositions.length; i++) {
    if (imagePositions[i].clicked) {
      redCount++;
    }
  }
  if (redCount === 7) {
    gameOver = true;
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

function tooClose(x, y, positions) {
  for (let i = 0; i < positions.length; i++) {
    let pos = positions[i];
    let distance = dist(x, y, pos.x, pos.y);
    if (distance < 120) {
      return true;
    }
  }
  return false;
}

function mouseClicked() {
  if (showInstructions) {
    showInstructions = false;
  } else if (!gameStarted) {
    gameStarted = true;
  } else {
    for (let i = 0; i < imagePositions.length; i++) {
      let pos = imagePositions[i];
      if (
        mouseX > pos.x - 50 &&
        mouseX < pos.x + 50 &&
        mouseY > pos.y - 50 &&
        mouseY < pos.y + 50
      ) {
        pos.clicked = !pos.clicked;
      }
    }
  }
}
