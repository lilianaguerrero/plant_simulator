export default class Plant {
  constructor(game) {
    this.image = document.getElementById("img_plant");
    //allows us to use game within any of the other functions
    this.game = game;
    this.position = {
      x: game.gameWidth / 2,
      y: game.gameHeight / 2
    };
    this.width = 100;
    this.height = 100;
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
}
