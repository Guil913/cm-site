let capture;
let threshold = 0.5; 

function setup() {
  createCanvas(1550, 840);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide(); 

 
  button = createButton('Bruxas');
  button.position(width / 2 - 100, height / 2);
  button.size(200, 50);
  button.mousePressed(goToBruxas);
  button.hide(); 
}

function draw() {
  background(255);
  image(capture, 0, 0, width, height);

  let redPixels = 0;

 
  capture.loadPixels();
  

  for (let i = 0; i < capture.pixels.length; i += 4) {
    let r = capture.pixels[i];
    let g = capture.pixels[i + 1];
    let b = capture.pixels[i + 2];
    
 
    if (r > 100 && g < 80 && b < 80) { 
      redPixels++;
    }
  }

 
  let redPercentage = redPixels / (capture.width * capture.height);


  fill(0);
  textSize(20);
  text("Percentagem de Vermelho: " + nf(redPercentage * 100, 2, 2) + "%", 20, 30);

 
  if (redPercentage >= threshold) {
    
    button.show();
  }
}

function goToBruxas() {
  window.location.href = "bruxas.html";
}
