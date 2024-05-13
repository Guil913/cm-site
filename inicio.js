let backgroundImage; 
let startButton;

function preload() {

  backgroundImage = loadImage("art/inicio.png");
}

function setup() {
  createCanvas(1550, 840);


  startButton = createButton('Jogar');
  startButton.position(width / 2 -50 , height / 2 );
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
 
  image(backgroundImage, 0, 0, width, height);
}

function startGame() {
 
  window.location.href = "missao.html";
}
