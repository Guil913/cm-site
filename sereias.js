let pianoKeys = [];
let selectedKeys = [];
let gameState = "waiting";
let numKeys = 7;
let currentSequence = [];
let playerSequence = [];
let round = 1;
let notification = "";
let revealIndex = 0; // Index for revealing tiles one by one
let countdown = 3; // Countdown timer between rounds
let countdownInterval;
let clickedKey = -1; // Index of the clicked key

function setup() {
  createCanvas(400, 200);
  for (let i = 0; i < numKeys; i++) {
    pianoKeys.push(new PianoKey(i * 50 + 50, height / 2, 40, 100));
  }
  textAlign(CENTER, CENTER);
  textSize(20);
  startGame(); // Start the game immediately
}

function draw() {
  background(240);

  for (let key of pianoKeys) {
    key.display();
  }

  if (notification !== "") {
    fill(0);
    text(notification, width / 2, height / 2 + 30);
    setTimeout(() => {
      notification = "";
    }, 1000);
  }

  fill(0);
  text("Round " + round, width / 2, height / 2);

  if (countdown > 0 && gameState === "waiting") {
    text(countdown, width / 2, height / 2 + 50);
  }

  if (gameState === "playing") {
    if (frameCount % 30 === 0) {
      playSequence();
    }
  }

  // Briefly change the color of the clicked key to cyan
  if (clickedKey !== -1) {
    pianoKeys[clickedKey].color = color(0, 255, 255);
    setTimeout(() => {
      pianoKeys[clickedKey].color = color(0, 255, 0);
      clickedKey = -1; // Reset clicked key
    }, 200);
  }
  
  // Start countdown if gameState is waiting
  if (gameState === "waiting") {
    startCountdown();
  }
}

function mousePressed() {
  if (gameState === "playing") {
    for (let i = 0; i < pianoKeys.length; i++) {
      if (pianoKeys[i].contains(mouseX, mouseY)) {
        playerSequence.push(i);
        clickedKey = i; // Set clicked key
        if (playerSequence.length === currentSequence.length) {
          checkSequence();
        }
      }
    }
  }
}

function startGame() {
  selectedKeys = [];
  currentSequence = [];
  playerSequence = [];
  notification = "";
  revealIndex = 0;
  countdown = 3;
  gameState = "waiting"; // Start the game
}

function startCountdown() {
  countdown = 3;
  if (round > 1) {
    countdownInterval = setInterval(() => {
      countdown--;
      if (countdown === 0) {
        clearInterval(countdownInterval);
        gameState = "playing"; // Start the game after countdown
        selectKeys(round);
      }
    }, 1000);
  } else {
    gameState = "playing"; // Start the game immediately in the first round
    selectKeys(round);
  }
}

function selectKeys(num) {
  selectedKeys = [];
  const maxKeys = (num === 3) ? 3 : num; // Limit to 3 keys for round 3
  for (let i = 0; i < maxKeys; i++) {
    let randomIndex;
    do {
      randomIndex = floor(random(numKeys));
    } while (selectedKeys.includes(randomIndex)); // Ensure selected keys are different
    selectedKeys.push(randomIndex);
  }
  currentSequence = selectedKeys.slice();
}

function playSequence() {
  if (revealIndex < round) {
    let keyIndex = currentSequence[revealIndex];
    highlightKey(keyIndex);
    setTimeout(() => {
      unhighlightKey(keyIndex);
      revealIndex++;
    }, 1000);
  } else {
    gameState = "playing";
    revealIndex = 0; // Reset reveal index
  }
}

function highlightKey(index) {
  if (pianoKeys[index]) {
    if (selectedKeys.includes(index)) {
      if (round === 2) {
        pianoKeys[index].color = color(255, 192, 203); // Pink for round 2
      } else if (round === 3) {
        pianoKeys[index].color = color(255, 165, 0); // Orange for round 3
      } else {
        pianoKeys[index].color = color(0, 0, 255); // Blue for other rounds
      }
    } else {
      pianoKeys[index].color = color(0, 255, 0); // Green for non-selected keys
    }
  }
}

function unhighlightKey(index) {
  if (pianoKeys[index]) {
    pianoKeys[index].color = color(0, 255, 0);
  }
}

function checkSequence() {
  let correct = true;
  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== currentSequence[i]) {
      correct = false;
      break;
    }
  }
  if (correct) {
    notification = "Correct!";
    setTimeout(() => {
      round++;
      playerSequence = [];
      startCountdown();
    }, 1000);
  } else {
    notification = "Wrong...";
    gameState = "waiting"; // Reset the game
    round = 1;
    startCountdown();
  }
}

class PianoKey {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color(0, 255, 0);
  }

  display() {
    fill(this.color);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }

  contains(px, py) {
    return (
      px > this.x - this.w / 2 &&
      px < this.x + this.w / 2 &&
      py > this.y - this.h / 2 &&
      py < this.y + this.h / 2
    );
  }
}
