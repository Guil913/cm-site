let circleY;
const circleDiameter = 50;
let rectTimer = 0;
let rectColor = "red";
let timerDuration = 0;
let rectX;
let showStartMessage = true;
let img1, img2, stiltonImg; 

function preload() {
  img1 = loadImage('art/sp1.png');
  img2 = loadImage('art/sp2.png');
  stiltonImg = loadImage('art/stilton.png'); 
}

function setup() {
  createCanvas(1550, 840);
  frameRate(60);
  circleY = height - circleDiameter / 2;
  rectX = width / 2;
  setTimeout(changeRectColor, random(1000, 3000));
}

function draw() {
  if (rectColor === "red") {
    background(img2);
  } else {
    background(img1);
  }
    console.log("Stilton Y-coordinate:", circleY);
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
    text("Carrega para começar", width / 2, height / 2 +50);
  }
}

function changeRectColor() {
  rectColor = "red";
  timerDuration = random(800, 3000);
  rectTimer = millis();
}

function mouseClicked() {
  if (showStartMessage) {
    showStartMessage = false;
  }
}
