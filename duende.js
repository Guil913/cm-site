let duendeX;
let squareY;
let squareSpeed;
let squareDirection = 1;
let contador = 0;
let wasMousePressed = false;
let duendeImage;
let backgroundImage;
let layerImage;
let gameWon = false; // Variable to track if the game is won

function preload() {
  duendeImage = loadImage('art/duende.png');
  backgroundImage = loadImage('art/fundo.jpg');
  layerImage = loadImage('art/layer.png');
}

function setup() {
  createCanvas(1080, 760);
  duendeX = width / 2;
  squareSpeed = width / 2;
  cursor(HAND);
  resetDuendeY();
}

function resetDuendeY() {
  squareY = random(200, 730);
}

function draw() {
  background(backgroundImage);

  if (!gameWon) { // Check if the game is not yet won
    let imageSize = map(squareY, 200, 730, 100, 150);

    if (squareDirection === 1) {
      push();
      scale(-1, 1);
      image(duendeImage, -duendeX - imageSize / 2, squareY - imageSize / 2, imageSize, imageSize);
      pop();
    } else {
      image(duendeImage, duendeX - imageSize / 2, squareY - imageSize / 2, imageSize, imageSize);
    }

    duendeX += squareDirection * squareSpeed / frameRate();

    // Adjust direction if near canvas edge
    if (duendeX > width - imageSize / 2) {
      squareDirection = -1; // Change direction to move left
      resetDuendeY(); // Reset random Y-coordinate
    } else if (duendeX < imageSize / 2) {
      squareDirection = 1; // Change direction to move right
      resetDuendeY(); // Reset random Y-coordinate
    }

    // Check for mouse interaction
    let distanceToDuende = dist(mouseX, mouseY, duendeX, squareY);
    if (distanceToDuende < 40) { // Click detected within 100 pixels radius around duende
      if (mouseIsPressed && !wasMousePressed) {
        contador++;
        squareSpeed *= 1.1;
        if (contador >= 7) {
          gameWon = true; // Set gameWon to true
        }
      }
    }

    wasMousePressed = mouseIsPressed;

    // Display click counter
    textSize(32);
    fill(255);
    textAlign(CENTER, BOTTOM);
    text("Fragmentos: " + contador, width / 2, height - 10);
  } else {
    // Display "You win" message
    textSize(48);
    fill(255);
    textAlign(CENTER, CENTER);
    text("You win!", width / 2, height / 2);
  }

  // Display top layer image
  image(layerImage, 0, 0, width, height);
}
