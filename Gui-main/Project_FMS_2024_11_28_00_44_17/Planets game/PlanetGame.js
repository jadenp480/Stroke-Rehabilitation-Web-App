// creating object variables
let x, y;
let diameter = 50;

//timer variables
let startTime;
let elapsedTime = 0;
let clickCount = 0;
let gameRunning = true;

//background image
let spaceImage1;

// array to hold target images
let targetImages = [];
let currentTargetImage;

//session history
let sessionHistory = [];

// game state variable
let planetGameState = 'home'; // 'home', 'game', 'gameOver'
let level = 'easy'; // difficulty level

function planetspreload() {
  spaceImage1 = loadImage('Planets game/space.png');
  
  //loading target images
  targetImages.push(loadImage('Planets game/earth2.png'));
  targetImages.push(loadImage('Planets game/galaxy2.png'));
  targetImages.push(loadImage('Planets game/mars.png'));
  targetImages.push(loadImage('Planets game/neptune3.png'));
  targetImages.push(loadImage('Planets game/pluto2.png'));
  targetImages.push(loadImage('Planets game/saturn2.png'));
  targetImages.push(loadImage('Planets game/sun2.png'));
}

function planetsetup() {
  
  createCanvas(800, 600);
  
  
  // Initialize the object's position randomly within the canvas
  x = random(diameter / 2, width - diameter / 2);
  y = random(diameter / 2, height - diameter / 2);
  
  //intialize start time
  startTime = millis();
  
  currentTargetImage = random(targetImages);
  
  planetspreload();
}

function planetdraw() {
  
  image(spaceImage1, 0, 0, width, height);
  
    if (planetGameState === 'home') {
    drawHomeScreen();
  } else if (planetGameState === 'game') {
    playGame();
  } else if (planetGameState === 'gameOver') {
    displayGameOver();
  }
}

function drawHomeScreen() {
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(225);
  text('Select a Difficulty Level', width / 2, height / 4);

  // Easy button
  drawButton(width / 2 - 150, height / 2, 'Easy', 'easy');
  // Medium button
  drawButton(width / 2, height / 2, 'Medium', 'medium');
  // Hard button
  drawButton(width / 2 + 150, height / 2, 'Hard', 'hard');
}

function drawButton(x, y, label, levelValue) {
  let buttonWidth = 100;
  let buttonHeight = 50;
  
  fill(0, 102, 153);
  rectMode(CENTER);
  rect(x, y, buttonWidth, buttonHeight);
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(label, x, y);
  
  // Check if button is clicked
  if (mouseIsPressed) {
    if (mouseX > x - buttonWidth / 2 && mouseX < x + buttonWidth / 2 &&
        mouseY > y - buttonHeight / 2 && mouseY < y + buttonHeight / 2) {
      level = levelValue;
      startGame();
    }
  }
}

function startGame() {
  planetGameState = 'game';
  resetGame();
  
  // Set game difficulty based on selected level
  if (level === 'easy') {
    diameter = 140;
  } else if (level === 'medium') {
    diameter = 90;
  } else if (level === 'hard') {
    diameter = 70;
  }
}

function playGame() {
  
  //update elapsed time
  elapsedTime = millis() - startTime;
  
  if (gameRunning) {
  // Drawing the object
    image(currentTargetImage, x - diameter / 2, y - diameter / 2, diameter, diameter);
    
  //display elapsed time and click count
    fill(225);
    textSize(24);
    textAlign(LEFT, TOP);
    text('Time: ' + nf(elapsedTime / 1000, 1, 2) + ' s', 10, 30);
    text('Clicks: ' + clickCount, 10, 60);

  // Checking if the time has exceeded 60 seconds
    if (elapsedTime > 60000) {
      endGame();
    }
  }
}   
    
    function displayGameOver() { 
    // Displaying the final click count
    fill(225);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Game Over!', width / 2, height / 4);
    text('Total Clicks: ' + clickCount, width / 2, height / 4 + 40);
    
    //displaying the session history
    textSize(24);
    textAlign(LEFT, TOP); 
    let yPos = height / 2;
    for (let i = 0; i < sessionHistory.length; i++) {
      let session = sessionHistory[i];
      text(`Session ${i + 1}: Clicks - ${session.clicks}, Time - ${nf(session.time, 1, 2)} s`, 10, yPos);
      yPos += 30; // Move down for the next session entry
    }
      
    //displaying the restart button
    let buttonWidth = 100;
    let buttonHeight = 40;
    let buttonX = width / 2 - buttonWidth / 2;
    let buttonY = height - buttonHeight - 20; // 20 pixels from the bottom

    fill(0, 102, 153);
    rectMode(CORNER); // Use CORNER mode for rect to align properly
    rect(buttonX, buttonY, buttonWidth, buttonHeight);
    fill(255);
    textAlign(CENTER, CENTER);
    text('Restart', width / 2, buttonY + buttonHeight / 2);
      
   // displaying the home button
  let homeButtonX = width / 4 - buttonWidth / 2;
  let homeButtonY = height - buttonHeight - 20; // 20 pixels from the bottom

  fill(0, 102, 153);
  rectMode(CORNER); // Use CORNER mode for rect to align properly
  rect(homeButtonX, homeButtonY, buttonWidth, buttonHeight);
  fill(255);
  textAlign(CENTER, CENTER);
  text('Home', homeButtonX + buttonWidth / 2, homeButtonY + buttonHeight / 2);
  
  }

function planetmousePressed() {
  
  if (planetGameState === 'game') {
    if (gameRunning) {
  
  // Check if the click is within the boundaries of the object
  let d = dist(mouseX, mouseY, x, y);
  if (d < diameter / 2) {
    
    // Repositioning the target image randomly within the canvas
    x = random(diameter / 2, width - diameter / 2);
    y = random(diameter / 2, height - diameter / 2);
    
    //randomly selecting a new target image
    currentTargetImage = random(targetImages);
    
    //increment the click counter
    clickCount++;
    }
   }
  } else if (planetGameState === 'gameOver') {
  //restart game if restart button is clicked 
    let buttonWidth = 100;
    let buttonHeight = 40;
    let buttonX = width / 2 - buttonWidth / 2;
    let buttonY = height - buttonHeight - 20; // 20 pixels from the bottom
    if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
      planetGameState = 'home';
      
    // home button clicked
    let homeButtonX = width / 4 - buttonWidth / 2;
    let homeButtonY = height - buttonHeight - 20; // 20 pixels from the bottom

    if (mouseX > homeButtonX && mouseX < homeButtonX + buttonWidth && mouseY > homeButtonY && mouseY < homeButtonY + buttonHeight) {
      backToMain();
    
      }
    }
  }
}

function resetGame() {
  
  x = random(diameter / 2, width - diameter / 2);
  y = random(diameter / 2, height - diameter / 2);
  startTime = millis();
  elapsedTime = 0;
  clickCount = 0;
  gameRunning = true;
  
  //selecting a new target image
  currentTargetImage = random(targetImages);
}

function endGame() {
  
  gameRunning = false;
  planetGameState = 'gameOver';
  sessionHistory.push({ clicks: clickCount, time: elapsedTime / 1000 });
  console.log(sessionHistory); //logging the session history
  }

function hidePlanetsbuttons() {
  homeButton.hide();
  resetButton.hide();
}