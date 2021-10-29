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
    this.createOpacityContainer();
    this.createBackground();
    this.createScore();
    this.createBurnout();
    this.createAsermax();
    this.createZenMark();

    this.showScene(() => {
      this.createZenBall();
      this.createControls();

    });
  }

  update() {

    if (this.zenBall) {
      Phaser.Actions.RotateAroundDistance(
        [this.zenBall],
        { x: this.asermax.x, y: this.asermax.y },
        this.zenSpeed,
        180
      );
    }
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
    this.anims.create({
      key: "zenMark_active",
      frames: this.anims.generateFrameNames("zenMark")
    });
    this.anims.create({
      key: "fire",
      frameRate: 6,
      frames: this.anims.generateFrameNames("fire")
    });
  }

  createOpacityContainer() {
    this.opacityContainer = this.add.group();
  }

  createScore() {
    this.scoreText = this.add.text(
      this.game.canvas.width / 2,
      20,
      "Zen points: 0",
      {
        fontFamily: "'pxll'",
        fontSize: 32,
        color: "#000000",
      }
    );
    this.scoreText.setOrigin(0.5);
    this.opacityContainer.add(this.scoreText);
  }

  updateScore() {
    this.scoreText.setText(`Zen points: ${this.score}`);
  }

  createBackground() {
    this.sound.play("music");
    this.add.image(0, 0, "background").setOrigin(0);
  }

  createBurnout() {
    this.burnout = this.add.sprite(
      0,
      this.game.canvas.height - 40,
      "fire"
    ).setOrigin(0).setAlpha(0.8).play({ key: "fire", repeat: -1 });
    this.burnoutBackground = this.add.rectangle(
      0,
      this.game.canvas.height + 140,
      this.game.canvas.width,
      this.game.canvas.height + this.burnoutIncreaseSpeed,
      0xff8318
    );
    this.burnoutBackground.setOrigin(0);
    this.burnoutBackground.setAlpha(0.8);
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
    this.tweens.add({
      targets: this.burnoutBackground,
      ease: "Power1",
      duration: 500,
      y: {
        from: this.burnoutBackground.y,
        to: this.burnoutBackground.y - this.burnoutIncreaseSpeed
      },
      onComplete: () => {
        this.checkBurnout();
      }
    })
  }

  checkBurnout() {
    if (this.burnout.y <= -100) {
      this.gameover();
    }
  }

  createAsermax() {
    const x = this.game.canvas.width / 2;
    const y = this.game.canvas.height / 2;
    this.asermax = this.add.sprite(
      x,
      y,
      "asermax"
    );
  }

  createZenMark() {
    const x = this.asermax.x;
    const y = this.asermax.y - 180;

    this.zenMark = this.add.sprite(
      x, y, "zenMark"
    );

    this.opacityContainer.add(this.zenMark);
  }

  createZenBall() {
    const x = this.asermax.x;
    const y = this.asermax.y - 180;
    this.zenBall = this.physics.add.sprite(x, y, "zenBall");
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
      this.zenMark.play("zenMark_active");
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

  showScene(callback) {
    this.tweens.add({
      targets: this.opacityContainer.children.getArray(),
      alpha: {
        from: 0,
        to: 1
      },
      duration: 1000,
      onComplete: () => {
        callback();
      }
    })
  }
}