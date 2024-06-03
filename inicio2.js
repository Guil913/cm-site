let backgroundImage;
let startButton;
let livroImage;
let livroHoverImage; 
let livroWidth = 150;
let livroHeight = 100;
let livroX;
let livroY;
let hovering = false;

function preload() {
  backgroundImage = loadImage("art/inicio.png");
  livroImage = loadImage("art/livro1.png");
  livroHoverImage = loadImage("art/livro2.png"); 
}

function setup() {
  createCanvas(1550, 863);
  livroX = width / 2 + 30;
  livroY = height / 2 - livroHeight / 2 + 20;

  startButton = createButton('Jogar');
  startButton.position(width / 2 - 50, height / 2);
  startButton.size(100, 50);
  startButton.style('font-size', '20px');
  startButton.style('background-color', '#4CAF50');
  startButton.style('color', 'white');
  startButton.style('border', 'none');
  startButton.style('cursor', 'pointer');
  startButton.style('border-radius', '10px');

  startButton.mousePressed(startGame);
}

function draw() {
  background(backgroundImage);

  // Check if the mouse is hovering over the livro image
  if (hovering) {
    image(livroHoverImage, livroX, livroY, livroWidth, livroHeight);
  } else {
    image(livroImage, livroX, livroY, livroWidth, livroHeight);
  }
}

function startGame() {
  window.location.href = "missao.html";
}

function mouseClicked() {
  if (mouseX > livroX && mouseX < livroX + livroWidth && mouseY > livroY && mouseY < livroY + livroHeight) {
    window.location.href = "portais.html";
  }
}

// Function to detect mouse hover over the livro image
function mouseMoved() {
  if (mouseX > livroX && mouseX < livroX + livroWidth && mouseY > livroY && mouseY < livroY + livroHeight) {
    hovering = true;
  } else {
    hovering = false;
  }
}
