let canvasWidth = 1080;
let canvasHeight = 760;

let moleX = [351, 412, 590, 739, 579];
let moleY = [555, 627, 564, 597, 688];

let currentMole = -1;
let score = 0;
let interval = 1550;
let backgroundImage, bottomLayer, topLayer, gnomeImg; 
let gameWon = false; 
let moleSize = 80; 

function preload() {
  backgroundImage = loadImage('art/2.png');
  bottomLayer = loadImage('art/1.png');
  topLayer = loadImage('art/3.png');
  gnomeImg = loadImage('art/gnomo.png'); 
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(60);
  changeMolePosition();
}

function draw() {
  imageMode(CORNER);
  image(bottomLayer, 0, 0, canvasWidth, canvasHeight); 
  image(backgroundImage, 0, 0, canvasWidth, canvasHeight);
  image(topLayer, 0, 0, canvasWidth, canvasHeight); 
  for (let i = 0; i < moleX.length; i++) {
    
noStroke();
    fill(102, 51, 0,0);
    if (i === currentMole) {
      fill(0, 255, 0,0);
    }
    ellipse(moleX[i], moleY[i], moleSize, moleSize);
  }

  if (currentMole !== -1) {
    image(gnomeImg, moleX[currentMole] - moleSize / 2, moleY[currentMole] - moleSize / 2 - 30, moleSize, moleSize); 
  }

  fill(0);
  textSize(24);
  textAlign(LEFT, BOTTOM);
  text(`Capturados: ${score}`, 40, 725); 

  if (score >= 7 && !gameWon) {
    gameWon = true; 
  }

  if (gameWon) { 
    displayWinMessage(); 
  }
}

function mouseClicked() {
  if (!gameWon) { 
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
  if (!gameWon) { 
    currentMole = int(random(moleX.length));
    setTimeout(changeMolePosition, interval);
  }
}

function displayWinMessage() {
  fill(255);
  textSize(64); 
  textAlign(CENTER, CENTER);
  text("Ganhaste!", width / 2, height / 2);
}
