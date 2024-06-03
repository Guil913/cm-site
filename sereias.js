let pianoTiles = [];
let sequence = [];
let userSequence = [];
let currentNoteIndex = 0;
let playingSequence = false;
let gameStarted = false;
let winMessage = "Ganhaste!";
let loseMessage = "Tenta Novamente!";
let win = false;
let bgImage;
let instrucoesImg;
let showInstructions = true;
let fadeAlpha = 255; 
let bubbles = [];

function preload() {
  bgImage = loadImage('art/ocean.png');
  instrucoesImg = loadImage('art/instrucoes2.png'); 
}

function setup() {
  createCanvas(1550, 863);
  textAlign(CENTER, CENTER);
  textSize(32);
  for (let i = 0; i < 7; i++) {
    let x = map(i, 0, 6, 0, width - 70);
    pianoTiles.push(new PianoTile(x, height / 2, 70, 200, i));
  }
}

function draw() {
  background(bgImage);

  if (showInstructions) {
    filter(BLUR, 5); 
  } else if (!gameStarted) {
    displayStartMessage();
  } else {
    updateBubbles(); 
    if (playingSequence) {
      playSequence();
    } else {
      displayNotes();
    }
  }

  if (win) {
    fill(0, 255, 0);
    text(winMessage, width / 2, height / 2);
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
  } else if (!gameStarted) {
    startGame();
  }
}

function startGame() {
  gameStarted = true;
  generateSequence();
  playSequence();
}

function generateSequence() {
  sequence = [];
  for (let i = 0; i < 7; i++) {
    let noteIndex = floor(random(0, 7));
    sequence.push(noteIndex);
  }
}

function playSequence() {
  if (currentNoteIndex < sequence.length) {
    let noteIndex = sequence[currentNoteIndex];
    let tile = pianoTiles[noteIndex];
    tile.play();
    currentNoteIndex++;
    setTimeout(playSequence, 1500); // Tempo
  } else {
    playingSequence = false;
    currentNoteIndex = 0;
  }
}

function displayNotes() {
  for (let tile of pianoTiles) {
    tile.display();
  }
}

function mousePressed() {
  if (gameStarted && !playingSequence) {
    for (let tile of pianoTiles) {
      if (tile.contains(mouseX, mouseY)) {
        userSequence.push(tile.noteIndex);
        tile.clicked();
        if (userSequence.length === sequence.length) {
          checkWin();
        }
        break;
      }
    }
  }
}

function checkWin() {
  win = true;
  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i] !== userSequence[i]) {
      win = false;
      break;
    }
  }
  
  if (win) {
    console.log("Win sequence: " + sequence.join(", "));
  } else {
    console.log("Lose sequence: " + userSequence.join(", "));
    setTimeout(() => {
      restartGame();
    }, 2000);
  }
}

function restartGame() {
  sequence = [];
  userSequence = [];
  currentNoteIndex = 0;
  playingSequence = false;
  gameStarted = false;
  win = false;
}

function displayStartMessage() {
  fill(255);
  text("Carrega para começar", width / 2, 340);
}


class Bubble {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = random(1, 3);
    this.alpha = 255;
  }

  move() {
    this.y -= this.speed;
    this.alpha -= 2;
  }

  display() {
    noStroke();
    fill(0, 0, 155, this.alpha);
    ellipse(this.x, this.y, this.size);
  }

  isOffScreen() {
    return this.y < -this.size || this.alpha <= 0;
  }
}


function createBubble() {
  let x = random(width);
  let y = height + 50;
  let size = random(10, 50);
  bubbles.push(new Bubble(x, y, size));
}


function updateBubbles() {
  for (let bubble of bubbles) {
    bubble.move();
    bubble.display();
  }
  bubbles = bubbles.filter(bubble => !bubble.isOffScreen());
  if (frameCount % 10 === 0) {
    createBubble();
  }
}

class PianoTile {
  constructor(x, y, w, h, noteIndex) {
    this.x = x;
    this.y = y + 200;
    this.w = w;
    this.h = h;
    this.noteIndex = noteIndex;
    this.playing = false;
    this.clickedColor = color(0, 255, 255);
    this.fadeDuration = 500;
    this.fadeStartTime = 0;
  }
  
  display() {
    noStroke();
    if (this.playing) {
      fill(255, 165, 0);
    } else {
      fill(255);
    }
    rect(this.x, this.y, this.w, this.h);
    stroke(0);
    strokeWeight(4);
    noFill();
    rect(this.x, this.y, this.w, this.h);
    
    if (millis() - this.fadeStartTime < this.fadeDuration) {
      fill(this.clickedColor);
      rect(this.x, this.y, this.w, this.h);
    }
  }
  
  contains(px, py) {
    return px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h;
  }
  
  play() {
    this.playing = true;
    setTimeout(() => {
      this.playing = false;
    }, 500);
  }
  
  clicked() {
    this.fadeStartTime = millis();
  }
}
