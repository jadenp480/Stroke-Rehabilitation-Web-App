let img;
let gameState = "start"; 
let startButton, galacticButton, traceButton, PlanetButton;
let gameStateIs = {  //tracks state of game
  start: false,
  gameOptions: false,
  galactic: false,
  trace: false,
  Planet: false
};

function preload() {
  img = loadImage("background.png");
  planetspreload();
  tracePreload();
}

function setup() {
  createCanvas(800, 448);
  startButton = { x: width / 2 - 75, y: height / 2 - 25, width: 150, height: 50 };

  // Game buttons
  galacticButton = { x: width / 2 - 100, y: height / 2 - 60, width: 200, height: 50 };
  traceButton = { x: width / 2 - 100, y: height / 2, width: 200, height: 50 };
  PlanetButton = { x: width / 2 - 100, y: height / 2 + 60, width: 200, height: 50 };
}

function draw() {
  switch (gameState) {
    case "start": {
      if (!gameStateIs.start) {
        showStartScreen();
        gameStateIs.start = true;
      }
      break;
    }
    case "gameOptions":{
      if (!gameStateIs.gameOptions) { 
        showGameOptions();
        gameStateIs.gameOptions = true;
      }
      break;
    }
    case "galactic":{
      if (!gameStateIs.galactic) {
        typesetup();
        gameStateIs.galactic = true;
      }
      typedraw();
      break;
    }
    case "trace":{
      if (!gameStateIs.trace) {
        tracegamesetup();
        gameStateIs.trace = true;
      }
      tracegamedraw();
      break;
    }
    case "planet":{
      if (!gameStateIs.Planet) {
        planetsetup();
        gameStateIs.Planet = true;
      }
        planetdraw();
      
      break;
    }
  }
}

function showStartScreen() {
  background (img);
  fill(255);
  textSize(50);
  textAlign(CENTER, CENTER);
  stroke(0, 0, 255); // Blue Border
  strokeWeight(8);
  text("Space Stability", width / 2, height / 4);

  fill(255, 0, 0);
  rect(startButton.x, startButton.y, startButton.width, startButton.height, 10); // less sharp edges

  fill(255); // inside text color
  textSize(30);
  text("START", startButton.x + startButton.width / 2, startButton.y + startButton.height / 2);
}

function showGameOptions() {
  createCanvas (800,488);
  background(img);
  fill(255);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Select a game!", width / 2, height / 4);

  // Type Quest
  textSize(18);
  stroke(255, 0, 0);
  strokeWeight(4);
  fill(200);
  rect(galacticButton.x, galacticButton.y - 20, galacticButton.width,
       galacticButton.height, 10); 
  fill(255);
  textAlign(CENTER, CENTER);
  text("Galactic TypeQuest", galacticButton.x + galacticButton.width / 2, galacticButton.y - 20 + galacticButton.height / 2);
  
  // Trace 
  fill(200);
  rect(traceButton.x, traceButton.y + 20, traceButton.width, traceButton.height, 10);
  fill(255);
  text("Trace The Constellations", traceButton.x + traceButton.width / 2, traceButton.y + 20 + traceButton.height / 2);
  
  // Planet for the Stars
  fill(200);
  rect(PlanetButton.x, PlanetButton.y + 60, PlanetButton.width, PlanetButton.height, 10);
  fill(255);
  text("Click the planets", PlanetButton.x + PlanetButton.width / 2, PlanetButton.y + 60 + PlanetButton.height / 2);
  
  noStroke();
}

function showGalacticTypeQuest() {
  background(20);
  fill(255);
  typegamesetup();
  // textSize(50);
  // textAlign(CENTER, CENTER);
  // text("Type game lol", width / 2, height / 2);
}

function showTrace() {
  background(20);
  fill(255);
  tracegamedraw();
}

function showPlanet() {
  background(20);
  fill(255);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("Click game lol", width / 2, height / 2 + 60);
}
function guimousePressed() {
  console.log(gameState);
  if (gameState === "start") {
    if (mouseX > startButton.x && mouseX < startButton.x + startButton.width &&
        mouseY > startButton.y && mouseY < startButton.y + startButton.height) {
      gameState = "gameOptions"; // Switch from start to options screen
      resetGameStates();
    }
  }
  else if (gameState === "gameOptions") {
    if (mouseX > galacticButton.x && mouseX < galacticButton.x + galacticButton.width &&
        mouseY > galacticButton.y && mouseY < galacticButton.y + galacticButton.height) {
      gameState = "galactic";
      resetGameStates();
    } else if (mouseX > traceButton.x && mouseX < traceButton.x + traceButton.width &&
               mouseY > traceButton.y && mouseY < traceButton.y + traceButton.height) {
      gameState = "trace";
      resetGameStates();
    } else if (mouseX > PlanetButton.x && mouseX < PlanetButton.x + PlanetButton.width &&
               mouseY > PlanetButton.y && mouseY < PlanetButton.y + PlanetButton.height + 60) {
      gameState = "planet";
      resetGameStates();
    }
  }
}

function mousePressed() {
  
  //console.log("Mouse is being pressed");
  switch (gameState){
    case "planet" :planetmousePressed(); break;
    case "trace" : tracemousePressed(); break;
    case "start":guimousePressed(); break;
    case "gameOptions":guimousePressed(); break;
    default : guimousePressed();
    }  
}
function mouseReleased(){
  switch (gameState){
    case "trace": tracemouseReleased();
    case "gameOptions" : console.log("mouse and stuff")
  }
}

function resetGameStates() {
  // resets game state after use
  for (let state in gameStateIs) {
    gameStateIs[state] = false;
  }
}

function backToMain(){
  resetGameStates();
  switch (gameState){
    case "trace": {
      hideTracebuttons();
      gameState = "gameOptions"
      break;
    }
    case "planet":{
      //function to hide buttons
      gameState = "gameOptions"
      break;
    }
    case "galactic":{
      gameState = "gameOptions";
      break;
    }
    default:
      resetGameStates();
      break;
  }

}
