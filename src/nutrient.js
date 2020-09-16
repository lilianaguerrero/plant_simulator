import { detectCollision } from "./collision";

export default class Nutrient {
  constructor(game, position) {
    this.image = document.getElementById("img_nutrient");
    //allows us to use game within any of the other functions
    this.game = game;
    this.position = position;
    this.width = 50;
    this.height = 50;
    this.markedForDeletion = false;
  }

  draw(cxt) {
    cxt.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    if (detectCollision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;

      this.markedForDeletion = true;
    }
  }
}
