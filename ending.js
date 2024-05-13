let backgroundImage; 
let startButton;

function preload() {

  backgroundImage = loadImage("art/ending.png");
}

function setup() {
  createCanvas(1550, 840);


  startButton = createButton('Volta ao Início');
  startButton.position(width / 2 + 370 , 690);
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
}

function startGame() {
 
  window.location.href = "index.html";
}
