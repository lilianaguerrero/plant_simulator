import InputHandler from "/src/input";
import Paddle from "/src/paddle";
import Ball from "/src/ball";
import { buildLevel, level1 } from "/src/levels";
import Plant from "./plant";

const GAMESTATE = {
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  WIN: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.plant = new Plant(this);
    this.gameObjects = [];
    this.resources = [];
    this.lives = 3;
    this.delta = [10];

    new InputHandler(this.paddle, this);
  }

  start() {
    if (this.gamestate !== GAMESTATE.MENU) return;

    this.resources = buildLevel(this, level1);
    this.ball.reset();
    this.gameObjects = [this.ball, this.paddle];

    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime, cxt) {
    if (
      this.resources.length > 0 &&
      this.resources.length < 10 &&
      this.resources.length < Math.min(...this.delta)
    ) {
      this.delta.push(this.resources.length);
      this.plant.width += 8 * (Math.max(...this.delta) - this.resources.length);
      this.plant.height +=
        8 * (Math.max(...this.delta) - this.resources.length);
      this.plant.position.x -=
        4 * (Math.max(...this.delta) - this.resources.length);
      this.plant.position.y -=
        4 * (Math.max(...this.delta) - this.resources.length);
    }

    if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

    if (
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;

    if (this.resources.length === 0) {
      this.gamestate = GAMESTATE.WIN;
      // this.gamestate = GAMESTATE.MENU;
      this.start();
    }

    [...this.gameObjects, ...this.resources].forEach((object) =>
      object.update(deltaTime)
    );

    this.resources = this.resources.filter(
      (resource) => !resource.markedForDeletion
    );
  }

  draw(cxt) {
    [...this.gameObjects, ...this.resources, this.plant].forEach((object) =>
      object.draw(cxt)
    );

    if (this.gamestate === GAMESTATE.MENU) {
      cxt.rect(0, 0, this.gameWidth, this.gameHeight);
      cxt.fillStyle = "rgba(0,0,0,1)";
      cxt.fill();

      cxt.font = "18px Arial";
      cxt.fillStyle = "white";
      cxt.textAlign = "center";
      cxt.fillText(
        "Use arrow keys to hit all resources within 3 lives. Press SPACE To Start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      cxt.rect(0, 0, this.gameWidth, this.gameHeight);
      cxt.fillStyle = "rgba(0,0,0,1)";
      cxt.fill();

      cxt.font = "30px Arial";
      cxt.fillStyle = "white";
      cxt.textAlign = "center";
      cxt.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gamestate === GAMESTATE.WIN) {
      cxt.rect(0, 0, this.gameWidth, this.gameHeight);
      cxt.fillStyle = "rgba(0,0,0,1)";
      cxt.fill();

      cxt.font = "18px Arial";
      cxt.fillStyle = "white";
      cxt.textAlign = "center";
      cxt.fillText(
        "YOU WON & GREW A HUGE JALAPENO PLANT",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
  }
}
