let seedX, seedY;
let waterCanX, waterCanY;
let holeX, holeY;
let holeColor;
let plantHeight;

let seedDragging = false;
let waterCanDragging = false;

let seedOriginalX, seedOriginalY;
let waterCanOriginalX, waterCanOriginalY;

let seedTouchedHole = false; // Flag to track if seed touched hole
let holeIsPink = false; // Flag to track if hole is pink

let gameEnded = false; // Flag to track if game has ended

let seedImage, waterCanImage, flowerImage; // Image variables

function preload() {
  // Load images
  seedImage = loadImage('art/seed.png');
  waterCanImage = loadImage('art/regador.png');
  flowerImage = loadImage('art/flower.png');
}

function setup() {
  createCanvas(1080, 760);
  seedOriginalX = 900;
  seedOriginalY = 350;
  seedX = seedOriginalX;
  seedY = seedOriginalY;
  waterCanOriginalX = 900;
  waterCanOriginalY = 500;
  waterCanX = waterCanOriginalX;
  waterCanY = waterCanOriginalY;
  holeX = width / 2;
  holeY = height - 50;
  holeColor = color(0, 255, 0);
  plantHeight = 0;
}

function draw() {
  background(220);
  
  // Draw seed
  image(seedImage, seedX, seedY, 50, 50);
  
  // Draw watering can
  image(waterCanImage, waterCanX, waterCanY, 50, 50);
  
  // Draw hole
  fill(holeColor);
  rect(holeX - 25, holeY - 25, 50, 50);
  
  // Draw plant
  fill(34, 44, 0);
  rect(width / 2 -10 , height - 80 - plantHeight, 20, plantHeight);
  
  // Check if seed touches the hole only once
  if (seedDragging && !seedTouchedHole && seedX + 25 > holeX - 25 && seedX + 25 < holeX + 25 && seedY + 25 > holeY - 25 && seedY + 25 < holeY + 25) {
    holeColor = color(255, 192, 203); // Pink color
    seedTouchedHole = true; // Set flag to true
    holeIsPink = true; // Set flag to true
  }
  
  // Check if watering can touches the hole only if hole is pink and game has not ended
  if (waterCanDragging && holeIsPink && !gameEnded && waterCanX + 25 > holeX - 25 && waterCanX + 25 < holeX + 25 && waterCanY + 25 > holeY - 25 && waterCanY + 25 < holeY + 25) {
    plantHeight += 3; // Increase height slower
    if (plantHeight >= 400) {
      gameEnded = true;
    }
  }
  
  // Display "You win" message when green square's height reaches 400
  if (gameEnded) {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    text("You win!", width / 2, height / 2);
  }
  
  // Draw flower on top of the plant at the highest point, proportional to plant height
  let flowerSize = map(plantHeight, 0, 400, 0, 300); // Map plant height to flower size
  image(flowerImage, width / 2 - flowerSize / 2, height - 50 - plantHeight - flowerSize, flowerSize, flowerSize);
}

function mousePressed() {
  if (mouseX > seedX && mouseX < seedX + 50 && mouseY > seedY && mouseY < seedY + 50) {
    seedDragging = true;
  } else if (mouseX > waterCanX && mouseX < waterCanX + 50 && mouseY > waterCanY && mouseY < waterCanY + 50) {
    waterCanDragging = true;
  }
}

function mouseReleased() {
  seedDragging = false;
  waterCanDragging = false;
  
  if (!seedTouchedHole) {
    holeColor = color(0, 255, 0); // Back to green only if seed hasn't touched hole
  }
  
  plantHeight = 0; // Reset plant height
  
  // Return dragged squares to original position
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
