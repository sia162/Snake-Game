//game variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");
const board = document.getElementById("board");
let speed = 5;
let lastTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 14, y: 17 };
let score = 0;

//game functions
function main(currentTime) {
  window.requestAnimationFrame(main); //loop
  if ((currentTime - lastTime) / 1000 < 1 / speed) return;
  lastTime = currentTime;
  gameEngine();
}

//collide function
function isCollide(snake) {
  //if bump into ourselves
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  //if bump into wall
  if (
    snake[0].x >= 21 ||
    (snake[0].x <= 0 && snake[0].y >= 21) ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}

function gameEngine() {
  //part 1:updating snake array and food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("GameOver");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
  }

  //part 2: food eaten -> increment score and regenerate food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });

    let a = 0;
    let b = 21;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //part 3: moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //part 4:display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) snakeElement.classList.add("head");
    else snakeElement.classList.add("snake");
    board.appendChild(snakeElement);
  });

  //part 5:display the food
  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //start the game
  moveSound.play();

  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
