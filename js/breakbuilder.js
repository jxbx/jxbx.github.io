//BREAK BUILDER v.0.2

//initialise DOM:

window.addEventListener('load', (event) => {
  //updateScore("red");
});


//declaring DOM elements as variables:

let alertText = document.getElementById("alert");
let scoreText = document.getElementById("score");
let pointsRemainingText = document.getElementById("pointsRemaining");
let maxBar = document.getElementById("maxBar");
let scoreBar = document.getElementById("scoreBar");
let pointerElement = document.getElementById("pointer");
let untilWin = document.getElementById("untilWin");

//initialising array to keep track of game state:

let balls = [
 {colour: "red", quantity: 5, points: 1},
 {colour: "yellow", quantity: 1, points: 2},
 {colour: "green", quantity: 1, points: 3},
 {colour: "brown", quantity: 1, points: 4},
 {colour: "blue", quantity: 1, points: 5},
 {colour: "pink", quantity: 1, points: 6},
 {colour: "black", quantity: 1, points: 7}
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


//****POTTING ACTIONS****

//case 1) red ball is selected by user:

function potRed() {

  clearAlert();

//if a red has just been potted:

    if (!redOn){
      alertText.innerText = "choose a colour ball";
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
      alertText.innerText = "you potted red";
      updateScore("red");
  }

//case 2) colour ball is selected and balls[0].quantity > 0;

function potColour(colour) {

  clearAlert();

//if all reds and final colour ball potted:

  if (tableCleared) {
    clearColours(colour);
    return;
  }

//if a colour ball has just been potted:

  if (redOn) {
    alertText.innerText = "choose a red ball";
    return;
  }

//otherwise:

  score += balls[lookup[colour]].points;
  redOn = true;
  alertText.innerText = "you potted " + colour;

//toggle tableCleared if final colour ball has just been potted:

  if (balls[0].quantity < 1){
    tableCleared = true;
  }
  updateScore(colour);
}

//case 3) colour ball selected and balls[0].quantity < 1;

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
  scoreText.innerText = "score: " + score;
  document.getElementById(input).innerText = "Remaining: " + balls[lookup[input]].quantity;
  pointsRemainingText.innerText = "points remaining: " + updateRemaining();
  updateBar();
}

//update score bar and win marker

function updateBar() {

  // total points left in game
  let pointsAvailable = score + updateRemaining();

  let widthFactor = 25; //allows score bar width to be calculated relative to 25rem initial width;
  let maxWidth = (pointsAvailable/maxPoints)*widthFactor; //sets bar width
  let scoreWidth = (score/maxPoints)*widthFactor; //sets score width

  let winningScore = (pointsAvailable%2 === 0) ?
  (pointsAvailable/2)+1 :
  Math.ceil(pointsAvailable/2);

  let pointsUntilWin = winningScore - score;
  let winningPosition = (winningScore/maxPoints)*widthFactor;

  //update CSS with new values:

  pointerElement.style.left = `${winningPosition}rem`;
  scoreBar.style.width = `${maxWidth}rem`;
  scoreBar.style.borderLeft = `${scoreWidth}rem solid pink`;

  untilWin.innerText = (pointsUntilWin >= 0) ?
  `win in ${pointsUntilWin} points` :
  "win achieved";

}

//to clear any pre-existing alert text:

function clearAlert () {
  alertText.innerText = "";
}
//returns total remaining points on table;

function updateRemaining () {

  let total = 0;

  for (const ball of balls){
    total += ball.points*ball.quantity
  }

  if (redOn){
    total += balls[6].points * balls[0].quantity;
  }
  else {
    total += balls[6].points * (balls[0].quantity + 1);
  }

  return total;

}
