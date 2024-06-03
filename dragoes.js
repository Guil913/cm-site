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
let fadeAlpha = 255;
let raindrops = [];

function preload() {
  backgroundImage = loadImage('art/eggbg.png');
  for (let i = 1; i <= 7; i++) {
    eggImages.push(loadImage('art/egg' + i + '.png'));
  }
  instrucoesImg = loadImage('art/instrucoes3.png');
}

function setup() {
  createCanvas(1550, 863);
  circleX = width / 2;
  circleY = height / 2;
  circleSize = 100;
  arrowX = 100;
  arrowSpeed = 4;
  clickedOnGreen = 0;
  for (let i = 0; i < 1000; i++) {
    raindrops.push(new Raindrop());
  }
}

function draw() {
  background(backgroundImage);
  
  if (showInstructions) {
    filter(BLUR, 5);
  }

  updateRaindrops();
  
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
    textSize(82);
    textFont('Luckiest Guy');
    fill(0);
    text("Ganhaste!", width / 2 - 230, height / 2);
  }

  if (showInstructions) {
    let imgX = (width - instrucoesImg.width) / 2;
    let imgY = (height - instrucoesImg.height) / 2;
    image(instrucoesImg, imgX, imgY);
  }

  if (fadeAlpha > 0) {
    fill(0, fadeAlpha);
    rect(0, 0, width, height);
    fadeAlpha -= 3;
  }
}

function mouseClicked() {
  if (showInstructions) {
    showInstructions = false;
  }
}

class Raindrop {
  constructor() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.z = random(0, 20);
    this.len = map(this.z, 0, 20, 10, 20);
    this.yspeed = map(this.z, 0, 20, 1, 20);
    this.thickness = map(this.z, 0, 20, 1, 3);
    this.opacity = map(this.z, 0, 20, 100, 255);
  }

  fall() {
    this.y += this.yspeed;
    this.yspeed += map(this.z, 0, 20, 0, 0.05);
    if (this.y > height) {
      this.y = random(-200, -100);
      this.yspeed = map(this.z, 0, 20, 4, 10);
    }
  }

  show() {
    let thick = map(this.z, 0, 20, 1, 3);
    strokeWeight(this.thickness);
    stroke(255, 255, 0, this.opacity);
    line(this.x, this.y, this.x, this.y + this.len);
  }
}

function updateRaindrops() {
  for (let raindrop of raindrops) {
    raindrop.fall();
    raindrop.show();
  }
}
