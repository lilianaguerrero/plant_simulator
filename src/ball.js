import { detectCollision } from "./collision";
export default class Ball {
  constructor(game) {
    this.image = document.getElementById("img_ball");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    //allows us to use game within any of the other functions
    this.game = game;

    this.size = 20;
    this.reset();
  }

  // resets position & speed
  reset() {
    this.position = { x: 10, y: 400 };
    this.speed = { x: 4, y: -6 };
  }

  draw(cxt) {
    cxt.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    // wall on the left or right
    if (this.position.x > this.gameWidth - this.size || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }
    // wall on top
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    // bottom of game
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }

    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
