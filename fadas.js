let seedX, seedY;
let waterCanX, waterCanY;
let holeX, holeY;
let holeColor;
let plantHeight;

let seedDragging = false;
let waterCanDragging = false;

let seedOriginalX, seedOriginalY;
let waterCanOriginalX, waterCanOriginalY;

let seedTouchedHole = false;
let holeIsPink = false;
let gameEnded = false;

let seedImage, waterCanImage, flowerImage, backgroundImage, topImage, instrucoesImg;
let plantedTextOpacity = 0;
let showInstructions = true;
let fadeAlpha = 255;

function preload() {
  seedImage = loadImage('art/seed.png');
  waterCanImage = loadImage('art/regador.png');
  flowerImage = loadImage('art/flower.png');
  backgroundImage = loadImage('art/fadasbg.png');
  topImage = loadImage('art/fadastop.png');
  instrucoesImg = loadImage('art/instrucoes7.png'); // Load the instructions image
}

function setup() {
  createCanvas(1550, 863);
  seedOriginalX = 1200;
  seedOriginalY = 350;
  seedX = seedOriginalX;
  seedY = seedOriginalY;
  waterCanOriginalX = 1200;
  waterCanOriginalY = 500;
  waterCanX = waterCanOriginalX;
  holeX = width / 2;
  holeY = height - 50;
  holeColor = color(0, 255, 0);
  plantHeight = 0;
}

function draw() {
  background(backgroundImage);

  if (showInstructions) {
    filter(BLUR, 5); // Apply blur to the background
  }

  image(seedImage, seedX, seedY, 80, 80);
  image(waterCanImage, waterCanX, waterCanY, 80, 80);

  fill(holeColor);
  rect(holeX - 25, holeY - 25, 50, 50);

  fill(34, 44, 0);
  rect(width / 2 - 10, height - 80 - plantHeight, 20, plantHeight);

  if (seedDragging && !seedTouchedHole && seedX + 25 > holeX - 25 && seedX + 25 < holeX + 25 && seedY + 25 > holeY - 25 && seedY + 25 < holeY + 25) {
    holeColor = color(255, 192, 203);
    seedTouchedHole = true;
    holeIsPink = true;
    plantedTextOpacity = 255;
  }

  if (waterCanDragging && holeIsPink && !gameEnded && waterCanX + 25 > holeX - 25 && waterCanX + 25 < holeX + 25 && waterCanY + 25 > holeY - 25 && waterCanY + 25 < holeY + 25) {
    plantHeight += 3;
    if (plantHeight >= 400) {
      gameEnded = true;
    }
  }

  if (gameEnded) {
    textSize(62);
    textFont('Luckiest Guy');
    textAlign(CENTER, CENTER);
    fill(0, 0, 0);
    text("Parabéns, Ganhaste!", width / 2, height / 2+100);
  }

  let flowerSize = map(plantHeight, 0, 400, 0, 300);
  image(flowerImage, width / 2 - flowerSize / 2, height - 50 - plantHeight - flowerSize, flowerSize, flowerSize);

  image(topImage, 0, 0, width, height);

  if (plantedTextOpacity > 0) {
    textSize(44);
    textFont('Luckiest Guy');
    textAlign(CENTER, CENTER);
    fill(0, plantedTextOpacity);
    text("Semente Plantada", width / 2, height / 2);
    plantedTextOpacity -= 2;
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

function mousePressed() {
  if (showInstructions) {
    showInstructions = false;
  } else {
    if (mouseX > seedX && mouseX < seedX + 50 && mouseY > seedY && mouseY < seedY + 50) {
      seedDragging = true;
    } else if (mouseX > waterCanX && mouseX < waterCanX + 50 && mouseY > waterCanY && mouseY < waterCanY + 50) {
      waterCanDragging = true;
    }
  }
}

function mouseReleased() {
  seedDragging = false;
  waterCanDragging = false;

  if (!seedTouchedHole) {
    holeColor = color(0, 255, 0);
  }

  plantHeight = 0;

  seedX = seedOriginalX;
  seedY = seedOriginalY;
  waterCanX = waterCanOriginalX;
  waterCanY = waterCanOriginalY;
}

function mouseDragged() {
  if (seedDragging) {
    seedX = mouseX - 25;
    seedY = mouseY - 25;
  }
  if (waterCanDragging) {
    waterCanX = mouseX - 25;
    waterCanY = mouseY - 25;
  }
}
