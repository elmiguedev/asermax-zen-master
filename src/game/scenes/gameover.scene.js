import Phaser from "phaser"

export default class GameoverScene extends Phaser.Scene {
  constructor() {
    super("GameoverScene")
  }

  init(data) {
    if (data.score) {
      this.score = data.score
    } else {
      this.score = 0;
    }
  }

  create() {
    this.createOpacityContainer();
    this.createBackground();
    this.createProta();
    this.createStress();
    this.createGameoverText();
    this.createInstructionsText();
    this.createScoreText();
    this.createControls();
    this.createMusic();
    this.createVolumeControl();
  }

  createOpacityContainer() {
    this.opacityContainer = this.add.group();
  }

  createBackground() {
    this.background = this.add.image(
      0,
      0,
      "background"
    ).setOrigin(0);

    this.burnout = this.add.rectangle(
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height,
      0xff8318
    ).setAlpha(0.8).setOrigin(0);
    this.opacityContainer.add(this.burnout);
  }

  createMusic() {
    this.sound.play("noise", {
      volume: 0.5
    });
  }

  createProta() {
    const x = this.game.canvas.width / 2;
    const y = this.game.canvas.height / 2
    this.asermax = this.add.image(
      x,
      y,
      "asermaxBurnout"
    );
  }

  createStress() {
    const stressCount = 2;
    this.stressMarks = []
    for (let i = 0; i < stressCount; i++) {
      const mark = this.add.image(200, 200, "stressMark");
      this.stressMarks.push(mark);
    }
    this.stressTimer = this.time.addEvent({
      delay: 500,
      repeat: -1,
      callback: () => {
        this.stressMarks.forEach(mark => {
          const x = Phaser.Math.Between(150, 350);
          const y = Phaser.Math.Between(200, 350);
          const angle = Phaser.Math.Between(-60, 60);
          mark.setPosition(x, y);
          mark.setAngle(mark.angle - angle);
        });
      }
    })
  }

  createGameoverText() {
    const text = this.add.text(
      240,
      140,
      `La meditación no fue buena y Asermax terminó explotando por el Burnout`,
      {
        fontFamily: "'pxll'",
        fontSize: 40,
        color: "#000000"
      }
    );
    text.setAlpha(0.7);
    text.setAlign("center");
    text.setWordWrapWidth(350);
    text.setOrigin(0.5);
    text.setLineSpacing(10);
    this.opacityContainer.add(text);

  }

  createInstructionsText() {
    const text = this.add.text(
      240,
      600,
      `REINTENTAR`,
      {
        fontFamily: "'pxll'",
        fontSize: 32,
        color: "#000000",
        backgroundColor: "white",
        padding: 16,
        fixedWidth: 300
      }
    );
    text.setAlpha(0.7);
    text.setAlign("center");
    text.setOrigin(0.5);
    text.setInteractive({ cursor: "pointer" });
    text.on("pointerdown", () => {
      this.start();
    })

    this.opacityContainer.add(text);

  }

  createScoreText() {
    const text = this.add.text(
      240,
      540,
      `Tu puntaje fue de ${this.score} zen points`, {
      fontFamily: "'pxll'",
      fontSize: 44,
      color: "#000000"
    }
    );
    text.setAlpha(0.7);
    text.setAlign("center");
    text.setWordWrapWidth(350);
    text.setOrigin(0.5);
    text.setLineSpacing(10);
    this.opacityContainer.add(text);

  }

  createControls() {
    this.controlsEnabled = false;
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.controlsEnabled = true;
      }
    })
    this.enter = this.input.keyboard.addKey("enter");
    this.space = this.input.keyboard.addKey("space");
    this.enter.onDown = (e) => {
      if (this.controlsEnabled)
        this.start();
    }
    this.space.onDown = (e) => {
      if (this.controlsEnabled)
        this.start();
    }
  }

  hideScene(callback) {
    this.asermax.setTexture("asermax");
    this.stressTimer.destroy();
    this.stressMarks.forEach(mark => {
      mark.destroy();
    });

    this.tweens.add({
      targets: this.opacityContainer.children.getArray(),
      alpha: {
        from: 0.7,
        to: 0
      },
      duration: 1000,
      onComplete: () => {
        callback();
      }
    })
  }

  start() {
    this.hideScene(() => {
      this.sound.stopAll();
      this.scene.start("MainScene");
    });
  }

  createVolumeControl() {
    const x = this.game.canvas.width - 45;
    const y = this.game.canvas.height- 40;
    this.volumeEnabled = true;
    this.volumeControl = this.add.image(x,y,"volumeOn");
    this.volumeControl.setScale(0.75);
    this.volumeControl.setInteractive({
      cursor: "pointer"
    });
    this.volumeControl.on("pointerdown", () => {
      if (this.volumeEnabled) {
        this.volumeEnabled = false;
        this.sound.setMute(true);
        this.volumeControl.setTexture("volumeOff");
      } else {
        this.volumeEnabled = true;
        this.sound.setMute(false);
        this.volumeControl.setTexture("volumeOn");
      }
    })
  }
}