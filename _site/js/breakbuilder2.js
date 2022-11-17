//initialise DOM:

window.addEventListener('load', () => {
  for (const ball of balls){
  createButton(ball)
  }
});

window.addEventListener('load', () => {
  updateScore("red");
});

//declaring DOM elements as variables:

let alertText = document.getElementById("alert");
let scoreText = document.getElementById("scoreText");
let pointsRemainingText = document.getElementById("pointsRemainingText");
let maxBar = document.getElementById("maxBar");
let pointsBar = document.getElementById("pointsBar");
let remainingBar = document.getElementById("remainingBar");
let pointer = document.getElementById("pointer");
let untilWin = document.getElementById("untilWin");
let buttonGroup = document.getElementById("buttonGroup");

//array to keep track of game state; also hexcodes for use when rendering individual button elements to DOM:

let balls = [
 {colour: "red", quantity: 15, points: 1, hex: "#FF0000"},
 {colour: "yellow", quantity: 1, points: 2, hex: "#ffff33"},
 {colour: "green", quantity: 1, points: 3, hex: "#00cc00"},
 {colour: "brown", quantity: 1, points: 4, hex: "#996633"},
 {colour: "blue", quantity: 1, points: 5, hex: "#0099ff"},
 {colour: "pink", quantity: 1, points: 6, hex: "#ff99cc"},
 {colour: "black", quantity: 1, points: 7, hex: "#000000"}
];

//lookup allows access to balls[index] using a string ("red", "yellow" etc)

const lookup = {
  "red": 0,
  "yellow": 1,
  "green": 2,
  "brown": 3,
  "blue": 4,
  "pink": 5,
  "black": 6
};

//global variables required to keep track of game state;

let score = 0; // total points from balls potted
let remaining = 0; //max points available from remaining balls
let redOn = true; //red available for next shot?
let tableCleared = false; //ready to clear the colours?
const maxPoints = updateRemaining(); //max possible points available - declared at initialisation

//for rendering button elements to the DOM:

function createButton (input) {
  let button = document.createElement('BUTTON');
  let text = document.createTextNode(`${input.quantity}`);
  button.appendChild(text);
  button.style.backgroundColor = input.hex;
  input.colour === "red" ?
  button.addEventListener("click", potRed) :
  button.addEventListener("click", function () {potColour(input.colour)});
  buttonGroup.appendChild(button);
}
//****POTTING ACTIONS****

//CASE 1) red ball is selected by user:

function potRed() {

  clearAlert();

//if a red has just been potted:

    if (!redOn){
      alertText.innerText = "select a colour ball";
      return;
    }

// if there are no reds left:

    if (balls[0].quantity <= 0){
      alertText.innerText = "already potted reds";
      return;
    }

//otherwise:

      score ++;
      balls[0].quantity -= 1;
      redOn = false;
      alertText.innerText = "you potted red (+1)";
      updateScore("red");
  }

//CASE 2) colour ball is selected and balls[0].quantity > 0;

function potColour(colour) {

  clearAlert();

//if all reds and final colour ball potted:

  if (tableCleared) {
    clearColours(colour);
    return;
  }

//if a colour ball has just been potted:

  if (redOn) {
    alertText.innerText = "select red ball";
    return;
  }

//otherwise:

  score += balls[lookup[colour]].points;
  redOn = true;
  alertText.innerText = "you potted " + colour + ` (+${balls[lookup[colour]].points})`;

//toggle tableCleared if final colour ball has just been potted:

  if (balls[0].quantity < 1){
    tableCleared = true;
  }
  updateScore(colour);
}

//CASE 3) colour ball selected and balls[0].quantity < 1;

function clearColours (colour) {

  //if color ball has already been potted:

  if (balls[lookup[colour]].quantity < 1){
    alertText.innerText = "already potted " + colour;
    return;
  }

  //else iterate through colour balls; if an earlier colour ball still needs to be potted:

  for (let i=1; i<lookup[colour]; i++){
    if (balls[i].quantity > 0){
      alertText.innerText = "you must pot " + balls[i].colour + " first";
      return;
    }
  }

  //otherwise:

  score += balls[lookup[colour]].points;
  balls[lookup[colour]].quantity --;
  alertText.innerText = "you potted " + balls[lookup[colour]].colour;

  updateScore(colour);

}


////OTHER FUNCTIONS

//updates DOM to show new "score" and "points remaining" values and new
//"remaining" value for individual colours;

function updateScore (input) {
  scoreText.innerText = score;
  pointsRemainingText.innerText = updateRemaining();
  let buttons = document.getElementById("buttonGroup").children;
  for (let i=0; i<buttons.length; i++){
    buttons[i].innerText=balls[i].quantity;
  }
  updateBar();
}

//update score bar and win marker

function updateBar() {

  // total points left in game
  let pointsAvailable = score + updateRemaining();

  let winningScore = (pointsAvailable%2 === 0) ?
  (pointsAvailable/2)+1 :
  Math.ceil(pointsAvailable/2);

  let pointsUntilWin = winningScore - score;
  let winningPosition = winningScore/maxPoints*100;

  //update CSS with new values:

  pointsBar.style.width = `${score/maxPoints*100}%`;
  remainingBar.style.width = `${updateRemaining()/maxPoints*100}%`;
  pointer.style.marginLeft = `${winningPosition}%`;

  untilWin.innerText = (pointsUntilWin > 0) ?
  `win in ${pointsUntilWin} points` :
  `win achieved`;

  if (pointsUntilWin < 0){
    untilWin.style.color = "white";
  }

}

//to clear any pre-existing alert text:

function clearAlert () {
  alertText.innerText = "";
}

//returns total remaining points on table:

function updateRemaining () {

  let total = 0;

  for (const ball of balls){
    total += ball.points*ball.quantity
  }

  if (redOn){
    total += balls[lookup["black"]].points * balls[lookup["red"]].quantity;
  }
  else {
    total += balls[lookup["black"]].points * (balls[lookup["red"]].quantity + 1);
  }

  return total;

}

//opens and closes the info section at the top of the page

function expandInfo() {
  if(aboutContent.style.display === "block"){
    aboutContent.style.display = "none";
  }
  else{
    aboutContent.style.display = "block";
  }
}
