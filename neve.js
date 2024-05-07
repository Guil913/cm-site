let images = [];
let timer = 0;
let interval = 2500; // 3 seconds
let showingImages = false; // Initially set to false
let gameOver = false;
let imagePositions = [];
let gameStarted = false; // Variable to track whether the game has started
let snowBackground; // Variable to hold the snow background image

function preload() {
  for (let i = 1; i <= 7; i++) {
    images.push(loadImage(`art/c${i}.png`));
  }
  snowBackground = loadImage("art/snow2.png"); // Load the snow background image
}

function setup() {
  createCanvas(1080, 760);
  timer = millis(); // Start the timer
  textAlign(CENTER, CENTER);
}

function draw() {
  image(snowBackground, 0, 0, width, height); // Draw the snow background image

  // Check if game is over
  if (gameOver) {
    fill(0);
    textSize(32);
    text("You Win!", width / 2, height / 2);
    return;
  }

  // Check if game has started, if not, display "click to start" message
  if (!gameStarted) {
    fill(0);
    textSize(32);
    text("Click to Start", width / 2, height / 2);
    return;
  }

  // Draw squares to show image borders and images
  for (let i = 0; i < imagePositions.length; i++) {
    let pos = imagePositions[i];
    if (showingImages || pos.clicked) { // Draw images if showing or if clicked
      if (pos.clicked) {
        stroke(255, 0, 0); // Red color if clicked
      } else {
        stroke(0, 255, 0,0); // Green color if not clicked
      }
      strokeWeight(2);
      noFill();
      rect(pos.x - 50, pos.y - 50, 60, 60); // Draw square around image
    }
    if (showingImages) { // Draw images if showing
      image(images[i], pos.x - 50, pos.y - 50, 60, 60); // Display image at fixed size and position
    }
  }

  // Check if it's time to show images or not
  if (millis() - timer >= interval) {
    // Reset the timer
    timer = millis();
    showingImages = !showingImages;

    // Generate random positions for images
    imagePositions = [];
    let attempts = 0;
    while (imagePositions.length < 7 && attempts < 100) {
      let x = random(300, 840);
      let y = random(550, 750);
      if (!tooClose(x, y, imagePositions)) {
        imagePositions.push({ x: x, y: y, clicked: false }); // Initialize clicked property
      }
      attempts++;
    }
  }

  // Check if all borders are red to determine if the game is won
  let redCount = 0;
  for (let i = 0; i < imagePositions.length; i++) {
    if (imagePositions[i].clicked) {
      redCount++;
    }
  }
  if (redCount === 7) {
    gameOver = true; // If all borders are red, set gameOver to true
  }
}

// Function to check if the new position is too close to existing positions
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

// Function to handle mouse clicks
function mouseClicked() {
  // If game hasn't started, set gameStarted to true
  if (!gameStarted) {
    gameStarted = true;
  } else {
    // Check if mouse click is inside any of the rectangles
    for (let i = 0; i < imagePositions.length; i++) {
      let pos = imagePositions[i];
      if (
        mouseX > pos.x - 50 &&
        mouseX < pos.x + 50 &&
        mouseY > pos.y - 50 &&
        mouseY < pos.y + 50
      ) {
        // Toggle clicked property to change border color
        pos.clicked = !pos.clicked;
      }
    }
  }
}
