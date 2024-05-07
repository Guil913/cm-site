let canvasWidth = 1080;
let canvasHeight = 760;

let moleX = [351, 412, 590, 739, 579];
let moleY = [555, 627, 564, 597, 688];

let currentMole = -1;
let score = 0;
let interval = 1550;
let backgroundImage, bottomLayer, topLayer;
let gameWon = false; // Variable to track if the game is won

function preload() {
  backgroundImage = loadImage('art/2.png');
  bottomLayer = loadImage('art/1.png');
  topLayer = loadImage('art/3.png');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(60);
  changeMolePosition();
}

function draw() {
  imageMode(CORNER);
  image(bottomLayer, 0, 0, canvasWidth, canvasHeight); // Bottom layer
  image(backgroundImage, 0, 0, canvasWidth, canvasHeight); // Middle layer background)
  image(topLayer, 0, 0, canvasWidth, canvasHeight); // Top layer 

  for (let i = 0; i < moleX.length; i++) {
    fill(102, 51, 0);
    if (i === currentMole) {
      fill(0, 255, 0);
    }
    ellipse(moleX[i], moleY[i], 80, 80);
  }

  fill(0);
  textSize(24);
  textAlign(LEFT, BOTTOM);
  text(`Score: ${score}`, 70, 725); // score texto

  if (score >= 7 && !gameWon) {
    gameWon = true; // Set gameWon to true
  }

  if (gameWon) { // Check if the game is won
    displayWinMessage(); // Display "You win" message
  }
}

function mouseClicked() {
  if (!gameWon) { // Check if the game is not yet won
    for (let i = 0; i < moleX.length; i++) {
      let distance = dist(moleX[i], moleY[i], mouseX, mouseY);
      if (distance < 40 && i === currentMole) {
        score++;
        changeMolePosition();
        break;
      }
    }
  }
}

function changeMolePosition() {
  if (!gameWon) { // Check if the game is not yet won
    currentMole = int(random(moleX.length));
    setTimeout(changeMolePosition, interval);
  }
}

function displayWinMessage() {
  fill(255);
  textSize(64); // Increase text size
  textAlign(CENTER, CENTER);
  text("You win!", width / 2, height / 2);
}
