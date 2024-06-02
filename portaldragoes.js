let capture;
let threshold = 0.45; 
let button;

function setup() {
  createCanvas(1550, 863);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide(); 

 
  button = createButton('Dragões');
  button.position(width / 2 - 100, height / 2);
  button.size(200, 50);
  button.mousePressed(goToBruxas);
  button.hide(); 
}

function draw() {
  background(255);
  image(capture, 0, 0, width, height);

  let yellowPixels = 0;


  capture.loadPixels();
  
 
  for (let i = 0; i < capture.pixels.length; i += 4) {
    let r = capture.pixels[i];
    let g = capture.pixels[i + 1];
    let b = capture.pixels[i + 2];
    
   
    let hsl = rgbToHsl(r, g, b);
    let hue = hsl[0]; 

    
    if (hue >= 40 && hue <= 80) {
      yellowPixels++;
    }
  }


  let yellowPercentage = yellowPixels / (capture.width * capture.height);

 
  fill(0);
  textSize(20);
  text("Percentagem de Amarelo: " + nf(yellowPercentage * 100, 2, 2) + "%", 20, 30);

 
  if (yellowPercentage >= threshold) {
    button.show();
  }
}

function goToBruxas() {
  window.location.href = "dragoes.html";
}


function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  let max = Math.max(r, g, b),
      min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; 
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s, l];
}
