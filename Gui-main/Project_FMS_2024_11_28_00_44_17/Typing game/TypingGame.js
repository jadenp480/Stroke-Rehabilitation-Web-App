// Global Variables
let StartGame;
let PastScores = [];
let UserTotal = 0;
let TextArray;
let ArrayInput;
let InputText;
let count = 0;
let CorrectAnswerText;
let YourAnswerText;
let ResultText;
let Timer;
let Seconds = 0;
let TimerRunning = false;
let StopWatch;
let CharactersTyped = [];
let Waiting;
let stars = [];

// Create containers
const StopwatchContainer = document.createElement("div");
const InputContainer = document.createElement("div");
const StatsContainer = document.createElement("div");

// Input field (textarea for multiple rows)
const InputField = document.createElement("textarea");

// Prompt message
const PromptMessage = document.createElement("p");

function typesetup() {
  createCanvas(windowWidth, windowHeight);

  // Generate stars for space background
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(2, 5),
      opacity: random(100, 255),
    });
  }
  InputField.disabled = false;
  setupUI();
}

function setupUI() {

  // Create Start Button
  StartGame = createButton("Start Game");
  StartGame.size(150, 60);
  StartGame.style('background-color', '#333');
  StartGame.style('color', 'white');
  StartGame.style('font-size', '20px');
  StartGame.style('border', '2px solid white');
  StartGame.style('border-radius', '15px');
  StartGame.position(width / 2 - 75, height / 2 - 30);
  StartGame.mousePressed(() => {
    StartGame.hide();
    TextGame();
  });
}

function typedraw() {
  drawSpaceBackground(); // Render space background
  if (TimerRunning) {
    StopwatchContainer.textContent = `StopWatch: ${nf(Seconds, 2)}`;
  }
}

function drawSpaceBackground() {
  // Gradient for deep space effect
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(0, 0, 50), color(0, 0, 10), inter);
    stroke(c);
    line(0, y, width, y);
  }

  // Add glowing effect
  noStroke();
  fill(50, 50, 200, 50);
  ellipse(width / 2, height / 2, 500, 500);

  // Add stars
  for (let star of stars) {
    noStroke();
    fill(255, 255, 255, star.opacity);
    ellipse(star.x, star.y, star.size);

    // Slightly move the stars for a dynamic effect
    star.y += 0.5;
    if (star.y > height) {
      star.y = 0;
      star.x = random(width);
    }
  }
}

function ResetGame(){
  InputField.value = ""; // empties input field
  
  
  let TotalPercent = (UserTotal / InputText.length) * 100;
  
  if (TotalPercent > 0){ // If they have a score at all, they should
  PastScores.push(TotalPercent.toFixed(2)) //Adds last score to array
    
  let CurrentChars = UserText.trim().length;
    CharactersTyped.push(CurrentChars)
    
    if (count < 2){ // runs 2 additional times after first textgame call
    TextGame();
    ++count // Tracks how many times it runs
  }
  else{
    EndGame() // end the game
  }
  }
}

function TextGame() {
  
  // Stopwatch at the top
  StopwatchContainer.style.position = "absolute";
  StopwatchContainer.style.top = "20px";
  StopwatchContainer.style.left = "50%";
  StopwatchContainer.style.transform = "translateX(-50%)";
  StopwatchContainer.style.color = "white";
  StopwatchContainer.style.fontSize = "18px";
  document.body.appendChild(StopwatchContainer);
  
  InputContainer.style.position = "absolute";
  InputContainer.style.top = `${height / 3 - 80}px`; // Adjusted higher for better visibility
  InputContainer.style.left = `${width / 2 - 300}px`;
  InputContainer.style.width = "600px";
  InputContainer.style.textAlign = "center";
  InputContainer.style.color = "white";
  InputContainer.style.fontSize = "20px";
  InputContainer.style.marginBottom = "20px";
  document.body.appendChild(InputContainer);
  
  StatsContainer.style.position = "absolute";
  StatsContainer.style.top = `${height / 2 + 50}px`; // Moved higher
  StatsContainer.style.left = `${width / 2 - 300}px`;
  StatsContainer.style.width = "600px";
  StatsContainer.style.textAlign = "center";
  StatsContainer.style.color = "white";
  StatsContainer.style.fontSize = "18px"; // Enlarged font size for better readability
  StatsContainer.style.marginTop = "20px";
  document.body.appendChild(StatsContainer);
  
  StartTimer(); // starts the timer
  TextArray = [
    "Typing is the process of writing or inputting text by pressing keys on a keyboard.",
    "Fishing is the activity of trying to catch fish. Fish are often caught as wildlife.",
    "Skateboarding is an action sport that involves riding and performing tricks using a skateboard.", "Ice cream is a frozen dessert typically made from milk or cream that has been flavoured with a sweetener, either sugar or an alternative, and a spice, such as cocoa or vanilla, or with fruit, such as strawberries or peaches.", "Brain rot (or brainrot) is a colloquial term used to describe Internet content deemed to be of low quality or value, or the negative psychological and cognitive effects caused by exposure to it."
  ];
  ArrayInput = Math.floor(Math.random() * TextArray.length);
  InputText = TextArray[ArrayInput]; // picks random string from array

  // Set up prompt message
  PromptMessage.textContent = "Type this: " + InputText;
  PromptMessage.style.color = "white";
  PromptMessage.style.marginBottom = "20px";
  InputContainer.appendChild(PromptMessage);

  // Set up input field
  InputField.setAttribute("placeholder", "Start typing here...");
  InputField.style.border = "2px solid white";
  InputField.style.backgroundColor = "rgba(0, 0, 30, 0.8)";
  InputField.style.color = "white";
  InputField.style.fontSize = "18px";
  InputField.style.padding = "10px";
  InputField.style.boxShadow = "0 0 10px white";
  InputField.style.width = "100%";
  InputField.style.height = "60px"; // Increased height for 2 rows
  InputField.style.resize = "none"; // Disable resizing
  InputField.value = "";
  InputContainer.appendChild(InputField);

  setTimeout(() => {
    InputField.focus(); // Focus the input field after a slight delay
  }, 0);
  
  
InputField.addEventListener("input", (event) => {
    UserText = InputField.value;
    GameLogic();
  });
  // Waits for the user to hit enter before closing InputField
  InputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      UserText = InputField.value;
      GameLogic();
      ResetGame();
      
    }
  });
}


function GameLogic() {
  let UserText = InputField.value;
  UserTotal = 0;
  let ColoredText = "";

  for (let i = 0; i < InputText.length; ++i) {
    let a = UserText.charAt(i);
    let b = InputText.charAt(i);
    if (a === b) {
      ++UserTotal;
      ColoredText += `<span style="color: #00FF00">${a}</span>`; // Bright green
    } else if (a.toUpperCase() === b.toUpperCase()) {
      ColoredText += `<span style="color: #FFA500">${a}</span>`;
    } else {
      ColoredText += `<span style="color: #FF0000">${a}</span>`;
    }
  }

  let TotalPercent = (UserTotal / InputText.length) * 100;

  StatsContainer.innerHTML = `
    <p>Your Answer:${ColoredText}</p>
    <p>Correct Answer: <span style="color: #00FF00">${InputText}</span></p>
    <p>You got ${UserTotal}/${InputText.length} correct, giving you a score of ${TotalPercent.toFixed(2)}%</p>
  `;
}

function EndGame(){
  InputField.disabled = true; // Disables input
  ResultScreen(); //Shows results
  StopTimer(); // Stops stopwatch
  }


function ResultScreen() {
  console.log("ResultScreen function called.");

  // Remove unnecessary elements from the screen
  if (StopwatchContainer) StopwatchContainer.remove();
  if (InputContainer) InputContainer.remove();
  if (StatsContainer) StatsContainer.remove();
  //StatsContainer.innerHTML = ""
  if (PromptMessage) PromptMessage.remove();
  if (InputField) InputField.remove();
  if (StopWatch) StopWatch.remove();

  // Create a container for the stats
  const StatsOverlay = document.createElement('div');
  StatsOverlay.style.position = "absolute";
  StatsOverlay.style.top = "50%";
  StatsOverlay.style.left = "50%";
  StatsOverlay.style.transform = "translate(-50%, -50%)"; // Center the stats
  StatsOverlay.style.color = "white";
  StatsOverlay.style.textAlign = "center";
  StatsOverlay.style.fontSize = "20px";
  StatsOverlay.style.zIndex = "10"; // Ensure it appears above the canvas
  StatsOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)"; // Add slight transparency
  StatsOverlay.style.padding = "20px";
  StatsOverlay.style.borderRadius = "15px";

  // Log scores and characters
  console.log("PastScores:", PastScores);
  console.log("CharactersTyped:", CharactersTyped);
  console.log("Seconds elapsed:", Seconds);

  // Create final results
  const FinalResult = document.createElement('p');
  let FirstTestScore = Number(PastScores.at(0));
  let SecondTestScore = Number(PastScores.at(1));
  let ThirdTestScore = Number(PastScores.at(2));

  FinalResult.innerHTML = `
    <p>Your Scores:</p>
    <p>1st Test: ${FirstTestScore}%</p>
    <p>2nd Test: ${SecondTestScore}%</p>
    <p>3rd Test: ${ThirdTestScore}%</p>
  `;

  // Calculate stats
  let TotalCharsTyped = CharactersTyped.reduce((sum, chars) => sum + chars, 0);
  let RawWPM = (((TotalCharsTyped / 5) / Seconds) * 60).toFixed(2);
  let AvgPercent = PastScores.reduce((sum, score) => sum + Number(score), 0) / PastScores.length;
  let CalculatedWPM = (RawWPM * (AvgPercent / 100)).toFixed(2);

  const FinalStats = document.createElement('p');
  FinalStats.innerHTML = `
    <p>Total Characters Typed: ${TotalCharsTyped}</p>
    <p>Raw WPM: ${RawWPM}</p>
    <p>Average Accuracy: ${AvgPercent.toFixed(2)}%</p>
    <p>Calculated WPM: ${CalculatedWPM}</p>
  `;

  // Append stats to overlay
  StatsOverlay.appendChild(FinalResult);
  StatsOverlay.appendChild(FinalStats);

  // Append overlay to the body
  document.body.appendChild(StatsOverlay);
  console.log("StatsOverlay appended to body.");

  // Play celebratory sound
  const Hooray = createAudio('Typing game/hooray.mp3');
  Hooray.volume(0.1);
  Hooray.play();
  
    // Create Restart Button
  const RestartButton = document.createElement('button');
  RestartButton.textContent = "Restart";
  RestartButton.style.padding = "10px 20px";
  RestartButton.style.fontSize = "16px";
  RestartButton.style.color = "white";
  RestartButton.style.backgroundColor = "#333";
  RestartButton.style.border = "2px solid white";
  RestartButton.style.borderRadius = "10px";
  RestartButton.style.cursor = "pointer";
  RestartButton.style.margin = "10px";
  RestartButton.addEventListener("click", RestartGame); // Add restart functionality

  // Create Home Button
  const HomeButton = document.createElement('button');
  HomeButton.textContent = "Home";
  HomeButton.style.padding = "10px 20px";
  HomeButton.style.fontSize = "16px";
  HomeButton.style.color = "white";
  HomeButton.style.backgroundColor = "#333";
  HomeButton.style.border = "2px solid white";
  HomeButton.style.borderRadius = "10px";
  HomeButton.style.cursor = "pointer";
  HomeButton.style.margin = "10px";
  HomeButton.addEventListener("click", MainMenu); 
  
  // Append buttons to StatsOverlay
  StatsOverlay.appendChild(RestartButton);
  StatsOverlay.appendChild(HomeButton);
  
}

function RestartGame() {
  // Reset all game state and go back to the start screen
  PastScores = [];
  CharactersTyped = [];
  UserTotal = 0;
  Seconds = 0;
  count = 0;

  // Reset timer and UI
  ResetTimer();

  // Clear the body content, but leave the canvas element for p5.js
  document.body.innerHTML = '';
  
  // Re-initialize the game
  typesetup();
}

function MainMenu() {
  PastScores = [];
  CharactersTyped = [];
  UserTotal = 0;
  Seconds = 0;
  count = 0;
  document.body.innerHTML = '';
  backToMain()
}

function UpdateTimerDisplay() {
    if (!StopWatch) {
    StopWatch = document.createElement('p');
    document.body.appendChild(StopWatch);
  }
  // This should all be decently self explanatory
  // padStart just makes it so 1 or 2 would show up as 01 or 02
  const DisplayMinutes = String(Math.floor((Seconds % 3600) / 60)).padStart(2, '0');
  const DisplaySeconds = String(Math.floor(Seconds % 60)).padStart(2, '0');
  StopWatch.innerHTML = `StopWatch: ${DisplayMinutes}:${DisplaySeconds}`;
}


function StartTimer() {
  if (!TimerRunning) {
    TimerRunning = true;
    Waiting = createAudio('Typing game/Waiting.mp3')
    Waiting.loop()
    Timer = setInterval(() => {
      Seconds++;
      redraw();
    }, 1000);
  }    
}

function StopTimer() {
  if (TimerRunning) {
    clearInterval(Timer);
    TimerRunning = false;
    Waiting.stop() 
  }
}

function ResetTimer(){
  TimerRunning = false;
  clearInterval(Timer)
  Seconds = 0;
  UpdateTimerDisplay();
}

function HideTypeResults(){
  // HIDE RESULTS SCREEN
}