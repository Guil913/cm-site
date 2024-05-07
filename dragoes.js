let circleX;
let circleY;
let circleSize;
let barX;
let barY;
let barWidth;
let barHeight;
let arrowX;
let arrowSpeed;
let clickedOnGreen;
let clickedOnRed;

function setup() {
  createCanvas(1080, 760);
  circleX = width / 2;
  circleY = height / 2;
  circleSize = 100;
  barX = 100;
  barY = 300;
  barWidth = 400;
  barHeight = 20;
  arrowX = barX;
  arrowSpeed = 4; // Increased speed
  clickedOnGreen = 0;
  clickedOnRed = 0;
}

function draw() {
  background(220);
  
  // Draw green circle
  fill(0, 255, 0);
  ellipse(circleX, circleY, circleSize);
  
  // Draw bar (divided into three parts)
  let thirdWidth = barWidth / 3;
  fill(255, 0, 0); // Red
  rect(barX, barY, thirdWidth, barHeight);
  fill(0, 255, 0); // Green
  rect(barX + thirdWidth, barY, thirdWidth, barHeight);
  fill(255, 0, 0); // Red
  rect(barX + 2 * thirdWidth, barY, thirdWidth, barHeight);
  
  // Draw arrow
  fill(255);
  rect(arrowX, barY - 10, 20, barHeight + 20);
  
  // Update arrow position
  arrowX += arrowSpeed;
  if (arrowX >= barX + barWidth || arrowX <= barX) {
    arrowSpeed *= -1;
  }
  
  // Check if clicked in circle
  if (mouseIsPressed && dist(mouseX, mouseY, circleX, circleY) < circleSize / 2) {
    if (arrowX > barX + 2 * thirdWidth && arrowX < barX + barWidth) {
      circleSize -= 5; // Decrease circle size when clicked on the red part
      clickedOnRed++;
    } else if (arrowX > barX + thirdWidth && arrowX < barX + 2 * thirdWidth) {
      circleSize += 5; // Increase circle size when clicked on the green part
      clickedOnGreen++;
    }
  }
  
  // Display click counts
  textSize(16);
  fill(0);
  text("Clicks on Green: " + clickedOnGreen, 10, height - 50);
  text("Clicks on Red: " + clickedOnRed, 10, height - 30);
}
