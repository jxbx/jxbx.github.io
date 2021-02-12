const playerElement = document.getElementById("player");
const scoreElement = document.getElementById("score");

let scoreTracker = 0;
scoreElement.innerText = scoreTracker;

function updateScore() {
  scoreTracker += 1;
  scoreElement.innerText = scoreTracker;
}

let yPlayer = 550;
let xPlayer = 190;

function moveUp() {
  yPlayer = Math.max(0, yPlayer - 5);
  playerElement.style.top = `${yPlayer}px`;
}

function moveDown() {
  yPlayer = Math.min(580, yPlayer + 5);
  playerElement.style.top = `${yPlayer}px`;
}
function moveLeft() {
  xPlayer = Math.max(0, xPlayer - 5);
  playerElement.style.left = `${xPlayer}px`;
}

function moveRight() {
  xPlayer = Math.min(380, xPlayer + 5);
  playerElement.style.left = `${xPlayer}px`;
}

const enemyElement = document.createElement("div");
enemyElement.id = "enemy";
document.getElementById("playArea").appendChild(enemyElement);

let yEnemy = Math.random() * 580;
let xEnemy = Math.random() * 380;

enemyElement.style.top = `${yEnemy}px`;
enemyElement.style.left = `${xEnemy}px`;

playerElement.style.top = `${yPlayer}px`;
playerElement.style.left = `${xPlayer}px`;

const controller = {
  ArrowLeft: { pressed: false},
  ArrowUp: { pressed: false},
  ArrowRight: { pressed: false},
  ArrowDown: { pressed: false}
};

function updateKeydown(event) {
  if (controller[event.key]) {
    controller[event.key].pressed = true;
    event.preventDefault();
  }
}

function updateKeyup(event) {
  if (controller[event.key]) {
    controller[event.key].pressed = false;
    event.preventDefault();
  }
}

function animate() {
  movePlayer();
  detectCollision();
  window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);

function movePlayer() {
  if (controller.ArrowUp.pressed) {
    moveUp();
  }
  if (controller.ArrowDown.pressed) {
    moveDown();
  }
  if (controller.ArrowLeft.pressed) {
    moveLeft();
  }
  if (controller.ArrowRight.pressed) {
    moveRight();
  } else {
    return;
  }
}

function detectCollision() {
  if (
    yEnemy + 20 >= yPlayer &&
    yPlayer + 20 >= yEnemy &&
    xEnemy + 20 >= xPlayer &&
    xPlayer + 20 >= xEnemy
  ) {
    respawnEnemy();
    updateScore();
  }
}

function respawnEnemy() {
  yEnemy = Math.random() * 580;
  xEnemy = Math.random() * 380;
  enemyElement.style.top = `${yEnemy}px`;
  enemyElement.style.left = `${xEnemy}px`;
}

window.addEventListener("keydown", updateKeydown);
window.addEventListener("keyup", updateKeyup);
