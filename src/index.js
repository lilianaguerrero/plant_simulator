import Game from "/src/game";

let canvas = document.getElementById("gameScreen");
// rendering context for actually drawing to the canvas
let cxt = canvas.getContext("2d");
// when updating, it clear what was previously there
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// instantiates a game object telling it to start
let game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;
//game loop clears screen, updates the paddle every frame
function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  // clear screen
  cxt.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(deltaTime);
  game.draw(cxt);
  // requests timestamp
  requestAnimationFrame(gameLoop);
}

// GIVES VALID TIME STAMP
requestAnimationFrame(gameLoop);
