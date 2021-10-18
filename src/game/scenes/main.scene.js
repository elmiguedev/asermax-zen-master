import Phaser, { Scene } from "phaser"

export default class MainScene extends Scene {
  constructor() {
    super("MainScene");
  }

  // game loop methods
  // ---------------------

  create() {
    this.createProperties();
    this.createAnimations();
    this.createBackground();
    this.createScore();
    this.createBurnout();
    this.createAsermax();
    this.createZenMark();
    this.createZenBall();
    this.createControls();
  }

  update() {

    Phaser.Actions.RotateAroundDistance(
      [this.zenBall],
      { x: this.asermax.x, y: this.asermax.y },
      this.zenSpeed,
      120
    );
  }

  // creation methods
  // ---------------------

  createProperties() {
    this.zenSpeed = 0.08;
    this.zenMarkWidth = 60;
    this.zenIncreaseSpeed = 0.003;
    this.burnoutIncreaseSpeed = 40;
    this.score = 0;
  }

  createAnimations() {

  }

  createScore() {
    this.scoreText = this.add.text(
      this.game.canvas.width / 2,
      20,
      "Zen points: 0"
    );
    this.scoreText.setOrigin(0.5);
  }

  updateScore() {
    this.scoreText.setText(`Zen points: ${this.score}`);
  }

  createBackground() {
    this.sound.play("music");
  }

  createBurnout() {
    this.burnout = this.add.rectangle(
      0,
      this.game.canvas.height,
      this.game.canvas.width,
      this.game.canvas.height + this.burnoutIncreaseSpeed,
      0xff0000
    );
    this.burnout.setOrigin(0);
    this.burnout.setAlpha(0.5);
  }

  increaseBurnout() {
    this.tweens.add({
      targets: this.burnout,
      ease: "Power1",
      duration: 500,
      y: {
        from: this.burnout.y,
        to: this.burnout.y - this.burnoutIncreaseSpeed
      },
      onComplete: () => {
        this.checkBurnout();
      }
    })
  }

  checkBurnout() {
    if (this.burnout.y <= 0) {
      this.gameover();
    }
  }

  createAsermax() {
    const x = this.game.canvas.width / 2;
    const y = this.game.canvas.height / 2;
    this.asermax = this.add.rectangle(
      x,
      y,
      80,
      120,
      0xffffff
    )
  }

  createZenMark() {
    const x = this.asermax.x;
    const y = this.asermax.y - 120;

    this.zenMark = this.add.rectangle(
      x, y, this.zenMarkWidth, this.zenMarkWidth, 0x00ff00
    );
  }

  createZenBall() {
    const x = this.asermax.x;
    const y = this.asermax.y - 120;
    this.zenBall = this.physics.add.sprite(x, y, "coso");
  }

  invertZenBall() {
    if (this.zenSpeed < 0)
      this.zenSpeed -= this.zenIncreaseSpeed;
    else
      this.zenSpeed += this.zenIncreaseSpeed;

    this.zenSpeed = -this.zenSpeed;
  }

  checkZen() {
    if (this.zenBall.y > this.asermax.y)
      return false;
    if (this.zenBall.x > this.asermax.x + (this.zenMarkWidth / 2))
      return false;
    if (this.zenBall.x < this.asermax.x - (this.zenMarkWidth / 2))
      return false;

    return true;
  }

  zen() {
    if (this.checkZen()) {
      this.score++;
      this.updateScore();
      this.invertZenBall();
      this.sound.play("zen");
    } else {
      this.increaseBurnout();
      this.sound.play("zenFail");
    }
  }

  createControls() {
    // [space] key option
    this.zenKey = this.input.keyboard.addKey("space");
    this.zenKey.on("down", () => {
      this.zen();
    })

    // mouse / touch option
    this.input.on('pointerdown', (pointer) => {
      this.zen();
    });
  }

  gameover() {
    this.sound.stopAll();
    this.scene.start("GameoverScene", {
      score: this.score
    });
  }
}