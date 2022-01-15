//game variables
let direction = { x: 0, y: 0 };
const foodSound = new Audio("./music/food.mp3");
const gameOverSound = new Audio("./music/gameover.mp3");
const moveSound = new Audio("./music/move.mp3");
const musicSound = new Audio("./music/music.mp3");
let speed = 2;
let lastTime = 0;

//game functions
function main(currentTime) {
  window.requestAnimationFrame(main); //loop
  if ((currentTime - lastTime) / 1000 < 1 / speed) return;
  lastTime = currentTime;
  gameEngine();
}

function gameEngine() {
  //part 1:updating snake array
  //part 2:display the snake and food
}

//main logic
window.requestAnimationFrame(main);
