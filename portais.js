let backgroundImage;
let startButton;

function preload() {
  backgroundImage = loadImage("art/tempo.png");
}

function setup() {
  createCanvas(1550, 863);

  startButton = createButton('Volta ao Início');
  startButton.position(width / 2 - 40, 690);
  startButton.size(100, 55);
  startButton.style('font-size', '20px');
  startButton.style('background-color', '#CB8813');
  startButton.style('color', 'white');
  startButton.style('border', 'none');
  startButton.style('cursor', 'pointer');
  startButton.style('border-radius', '10px');
  startButton.mousePressed(startGame);
}

function draw() {
  image(backgroundImage, 0, 0, width, height);

  
  noStroke();
  fill(255, 0); 
  ellipse(253, 342, 50, 50);
  ellipse(385, 584, 50, 50);
  ellipse(601, 466, 50, 50);
  ellipse(713, 256, 50, 50);
  ellipse(950, 571, 50, 50);
  ellipse(1180, 317, 50, 50);
  ellipse(1212, 657, 50, 50);
}

function startGame() {
  window.location.href = "index2.html";
}

function mouseClicked() {

  if (dist(mouseX, mouseY, 253, 342) < 25) {
    window.location.href = "duende.html";
  } else if (dist(mouseX, mouseY, 385, 584) < 25) {
    window.location.href = "neve.html";
  } else if (dist(mouseX, mouseY, 601, 466) < 25) {
    window.location.href = "sereias.html";
  } else if (dist(mouseX, mouseY, 713, 256) < 25) {
    window.location.href = "fadas.html";
  } else if (dist(mouseX, mouseY, 950, 571) < 25) {
    window.location.href = "toupeira.html";
  } else if (dist(mouseX, mouseY, 1180, 317) < 25) {
    window.location.href = "dragoes.html";
  } else if (dist(mouseX, mouseY, 1212, 657) < 25) {
    window.location.href = "bruxas.html";
  }
}
