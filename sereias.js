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

function preload() {
  bgImage = loadImage('art/ocean.png');
}

function setup() {
  createCanvas(1080, 760);
  textAlign(CENTER, CENTER);
  textSize(32);
  for (let i = 0; i < 7; i++) {
    let x = map(i, 0, 6, 0, width - 70);
    pianoTiles.push(new PianoTile(x, height / 2, 70, 200, i));
  }
}

function draw() {
  background(bgImage);
  if (!gameStarted) {
    displayStartMessage();
  } else {
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
}

function mouseClicked() {
  if (!gameStarted) {
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
