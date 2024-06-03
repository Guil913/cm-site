let circleY;
const circleDiameter = 50;
let rectTimer = 0;
let rectColor = "red";
let timerDuration = 0;
let rectX;
let showStartMessage = true;
let img1, img2, stiltonImg;
let instrucoesImg;
let showInstructions = true;
let fadeAlpha = 255; 

function preload() {
  img1 = loadImage('art/sp1.png');
  img2 = loadImage('art/sp2.png');
  stiltonImg = loadImage('art/stilton.png');
  instrucoesImg = loadImage('art/instrucoes1.png');
}

function setup() {
  createCanvas(1550, 863);
  frameRate(60);
  circleY = height - circleDiameter / 2;
  rectX = width / 2;
  setTimeout(changeRectColor, random(1000, 3000));
}

function draw() {
  if (rectColor === "red") {
    // shake tremor
    let shakeOffsetX = random(-10, 10);
    let shakeOffsetY = random(-10, 10);
    image(img2, shakeOffsetX, shakeOffsetY, width, height);
  } else {
    background(img1);
  }

  noStroke();
  fill(255, 0);
  rect(rectX - 25, 0, 50, 50);

  let stiltonX = width / 2 - circleDiameter / 2 - 4;
  image(stiltonImg, stiltonX, circleY - circleDiameter / 2, circleDiameter, circleDiameter);

  if (circleY <= 180) {
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER);
    text("Ganhaste!", width / 2, height / 2);
    noLoop();
  }

  if (rectColor !== "red") {
    if (keyIsDown(UP_ARROW)) {
      circleY -= 2;
    } else if (keyIsDown(DOWN_ARROW)) {
      circleY += 2;
    }
    circleY = constrain(circleY, circleDiameter / 2, height - circleDiameter / 2);
  }

  if (rectColor === "red") {
    if (keyIsPressed) {
      circleY = height - circleDiameter / 2;
    }
    if (millis() > rectTimer + timerDuration) {
      rectColor = "green";
      setTimeout(changeRectColor, random(700, 2000));
    }
  }

  if (showStartMessage) {
    fill(255);
    textSize(34);
    textAlign(CENTER, CENTER);
    text("Carrega para começar", width / 2, height / 2 + 50);
  }

  if (showInstructions) {
    filter(BLUR, 5);
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

function changeRectColor() {
  rectColor = "red";
  timerDuration = random(800, 3000);
  rectTimer = millis();
}

function mouseClicked() {
  if (showInstructions) {
    showInstructions = false;
  } else if (showStartMessage) {
    showStartMessage = false;
  }
}
