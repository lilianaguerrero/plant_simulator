export default class inputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 37:
          paddle.moveLeft();
          break;

        case 39:
          paddle.moveRight();
          break;

        case 32:
          game.start();
          break;

        default:
          return;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 37:
          if (paddle.speed < 0) paddle.stop();
          break;

        case 39:
          if (paddle.speed > 0) paddle.stop();
          break;

        default:
          return;
      }
    });
  }
}
