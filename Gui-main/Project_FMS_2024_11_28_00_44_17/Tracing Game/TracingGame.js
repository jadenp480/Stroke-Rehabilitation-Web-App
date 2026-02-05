let radius = 120; 

let isDrawing = false;

let shapePoints = [];
let userPoints = [];
let traceaccuracy = 0; 
let checkPoints = [];
let resetButton ; 
let tracebg ; 

function tracePreload() {
  spaceImage = loadImage('Tracing Game/SPACEEEE.jpg');
}
function tracegamesetup() {
  createCanvas(600, 300);
   background(spaceImage);
  stroke(150);
  line(0 , height /2 , width , height /2);
  
  resetButton = createButton('Reset'); 
  resetButton.position(20,30);
  resetButton.style('background-color' , 'green');
  resetButton.style('border','none');
  
  resetButton.style('color' , 'white');
  
  resetButton.style ('padding','15px 30px');
  resetButton.style('font-size', '20px');
  resetButton.style('cursor ', 'pointer');
  resetButton.mousePressed(traceresetGame);
  
  tracegenerateShape();
  
  //mousePressed= tracemousePressed;
  //mouseReleased = tracemouseReleased; 
  
  //NOT IN USE YET
  traceHomeButton();
}

function traceHomeButton(){
  homeButton = createButton('Home');
  homeButton.position(width -130, 30);
  homeButton.style('background-color', 'blue');
  homeButton.style('border' , 'none');
  homeButton.style('color', 'white');
  homeButton.style('padding' , '15px 30px');
  homeButton.style('font-size', '20px');
  homeButton.style('cursor' , 'pointer');
  homeButton.mousePressed(() => {
  (backToMain());
});
}

function tracegenerateShape(){
  shapePoints = []; 
  checkPoints = [] ; 
  userPoints = [] ; 
  
noFill();
  
  let numSides = int(random(3 , 7));
  beginShape();
  
for (let i = 0 ; i < numSides; i++){
  let angle = TWO_PI / numSides * i ; 
  let x = width /2 + cos(angle) * radius + random(-20 , 20);
  let y = height /  2 + sin(angle) * radius + random(-20 , 20);
  vertex( x , y) ; 
  shapePoints.push(createVector(x , y));
  checkPoints.push(createVector(x , y));
  
  if ( i> 0){
    let prev = shapePoints[ i -1];
    let dx = (x- prev.x) / 3;
    let dy = (y - prev.y) /3;
    for(let j = 1; j <3 ; j++){
      checkPoints.push(createVector(prev.x + dx * j , prev.y + dy * j )); 
    }
    
  }
}
  endShape(CLOSE);
}


function tracegamedraw() {
  
  background(spaceImage);
  
  stroke(255);
  noFill();
  beginShape();
  for(let point of shapePoints) {
    vertex(point.x , point.y);
  }
  endShape(CLOSE);
  
  stroke(0 , 0 , 225);
  strokeWeight(8);
  for(let pt of checkPoints){
    point(pt.x , pt.y);
  }
  
  stroke(0,250, 0);
  strokeWeight(10);
  for(let userPoint of userPoints){
    point(userPoint.x , userPoint.y);
  }
  if (isDrawing)  {
    userPoints.push(createVector(mouseX, mouseY));
    stroke(0, 250, 0); 
    strokeWeight(10);
    point(mouseX, mouseY); 
  }
  
fill(255);
  noStroke();
  textSize(30);
  textAlign( CENTER , TOP);
  textFont('Arial');
  text("Accuracy:" + traceaccuracy.toFixed(2) + "%",width -120 , height -30 );
}
function tracemousePressed() {
  userPoints = []; 
  isDrawing = true;
}
function tracemouseReleased() {
  isDrawing = false;
  tracecalculateAccuracy();
}


function tracecalculateAccuracy(){
  if(userPoints.length === 0 || shapePoints.length === 0) return;
  
  const marginOfError = 10; 
  let matchedPoints= 0 ;
  
  for (let checkPoint of checkPoints){
    for(let userPoint of userPoints){
      if (dist(userPoint.x , userPoint.y , checkPoint.x , checkPoint.y)< marginOfError){
        matchedPoints++;
        break; 
      }
    }
  }
    traceaccuracy = (matchedPoints / checkPoints.length) * 100;
}

function traceresetGame(){
  //console.log ("reseting game")
  traceaccuracy = 0 ;
  tracegenerateShape();
  background(spaceImage);
}

function hideTracebuttons(){
  homeButton.hide(); 
  resetButton.hide();
  
  
}