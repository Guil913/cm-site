let images = [];
let timer = 0;
let interval = 2500; 
let showingImages = false; 
let gameOver = false;
let imagePositions = [];
let gameStarted = false; 
let snowBackground; 

function preload() {
  for (let i = 1; i <= 7; i++) {
    images.push(loadImage(`art/c${i}.png`));
  }
  snowBackground = loadImage("art/snow2.png"); 
}

function setup() {
  createCanvas(1080, 760);
  timer = millis(); 
  textAlign(CENTER, CENTER);
}

function draw() {
  image(snowBackground, 0, 0, width, height); 

 
  if (gameOver) {
    fill(0);
    textSize(32);
    text("Ganhaste!", width / 2, height / 2);
    return;
  }

  
  if (!gameStarted) {
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
        stroke(0, 255, 0,0); 
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
      let x = random(300, 840);
      let y = random(550, 750);
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
  
  if (!gameStarted) {
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
