let duendeX;
let squareY;
let squareSpeed;
let squareDirection = 1;
let contador = 0;
let wasMousePressed = false;
let duendeImage;
let backgroundImage;
let layerImage;
let gameWon = false;

function preload() {
  backgroundImage = loadImage('art/fundo.jpg');
  layerImage = loadImage('art/layer.png');
  duendeImage = loadImage('art/duende.png');
}

function setup() {
  createCanvas(1550, 840);
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

  if (!gameWon) {
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

    if (duendeX > width - imageSize / 2) {
      squareDirection = -1;
      resetDuendeY();
    } else if (duendeX < imageSize / 2) {
      squareDirection = 1;
      resetDuendeY();
    }

    let distanceToDuende = dist(mouseX, mouseY, duendeX, squareY);
    if (distanceToDuende < 40) {
      if (mouseIsPressed && !wasMousePressed) {
        contador++;
        squareSpeed *= 1.1;
        if (contador >= 7) {
          gameWon = true;
        }
      }
    }

    wasMousePressed = mouseIsPressed;

    textSize(34);
    fill(0);
    textAlign(CENTER, BOTTOM);
    text("Fragmentos: " + contador, width / 2, height - 10);
  } else {
    textSize(48);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Ganhaste!", width / 2, height / 2);
  }

  image(layerImage, 0, 0, width, height);
}
