let capture;
let threshold = 0.8; //percentagem
let button;
let buttonShown = false; 
let peakPercentage = 0; 

function setup() {
  createCanvas(1080, 760);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide(); 


  button = createButton('Gnomos');
  button.position(width / 2 - 100, height / 2);
  button.size(200, 50);
  button.mousePressed(goToBruxas);
  button.hide(); 
}

function draw() {
  background(255);
  image(capture, 0, 0, width, height);

  let bluePixels = 0;

  capture.loadPixels();
  
 
  for (let i = 0; i < capture.pixels.length; i += 4) {
    let r = capture.pixels[i];
    let g = capture.pixels[i + 1];
    let b = capture.pixels[i + 2];
    
   
    let hsl = rgbToHsl(r, g, b);
    let hue = hsl[0]; 

    if (hue >= 200 && hue <= 260) {
      bluePixels++;
    }
  }

  // 
  let bluePercentage = bluePixels / (capture.width * capture.height);

  // 
  if (bluePercentage > peakPercentage) {
    peakPercentage = bluePercentage;
    console.log("Peak blue percentage:", peakPercentage);
  }

  // 
  fill(0);
  textSize(20);
  text("Percentagem de Azul: " + nf(bluePercentage * 100, 2, 2) + "%", 20, 30);

  // 
  if (bluePercentage >= threshold && !buttonShown) {
    button.show();
    buttonShown = true; // 
  }
}

function goToBruxas() {
  window.location.href = "toupeira.html";
}

// 
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
