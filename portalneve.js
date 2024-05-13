let capture;
let threshold = 0.5; 
let button;
let buttonShown = false; 
let peakPercentage = 0; 

function setup() {
  createCanvas(1550, 840);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();


  button = createButton('Gigantes');
  button.position(width / 2 - 100, height / 2);
  button.size(200, 50);
  button.mousePressed(goToBruxas);
  button.hide(); 
}

function draw() {
  background(255);
  image(capture, 0, 0, width, height);

  let purplePixels = 0;


  capture.loadPixels();
  

  for (let i = 0; i < capture.pixels.length; i += 4) {
    let r = capture.pixels[i];
    let g = capture.pixels[i + 1];
    let b = capture.pixels[i + 2];
    
   
    let hsl = rgbToHsl(r, g, b);
    let hue = hsl[0]; 

    
    if (hue >= 260 && hue <= 320) {
      purplePixels++;
    }
  }


  let purplePercentage = purplePixels / (capture.width * capture.height);


  if (purplePercentage > peakPercentage) {
    peakPercentage = purplePercentage;
    console.log("Peak purple percentage:", peakPercentage);
  }

  
  fill(0);
  textSize(20);
  text("Percentagem de Roxo: " + nf(purplePercentage * 100, 2, 2) + "%", 20, 30);


  if (purplePercentage >= threshold && !buttonShown) {
    button.show();
    buttonShown = true; 
  }
}

function goToBruxas() {
  window.location.href = "neve.html";
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
