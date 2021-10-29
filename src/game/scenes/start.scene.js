import Phaser from "phaser"

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene")
  }

  create() {
    this.createBackground();
    this.createProta();
    this.createIntroText();
    this.createInstructionsText();
    this.createKeysText();
    this.createControls();
    this.createMusic();
  }

  createBackground() {
    this.background = this.add.image(
      0,
      0,
      "background",
    ).setOrigin(0);
  }

  createProta() {
    const x = this.game.canvas.width / 2;
    const y = this.game.canvas.height / 2
    this.asermax = this.add.image(
      x,
      y,
      "asermax"
    );

    this.tweens.add({
      targets: this.asermax,
      ease: "Sine.easeInOut",
      y: {
        from: this.asermax.y,
        to: this.asermax.y - 5
      },
      duration: 2000,
      repeat: -1,
      yoyo: true
    })
  }

  createIntroText() {
    const text = this.add.text(
      240,
      370,
      "-- Aca va el texto del prota --"
    );
    text.setAlign("center");
    text.setWordWrapWidth(350);
    text.setOrigin(0.5);
  }

  createInstructionsText() {
    const text = this.add.text(
      240,
      480,
      "Texto instrucciones"
    );
    text.setAlign("center");
    text.setWordWrapWidth(350);
    text.setOrigin(0.5);
    text.setInteractive({ cursor: "pointer" });
    text.on("pointerdown", () => {
      this.start();
    })

  }

  createKeysText() {
    const text = this.add.text(
      240,
      570,
      "[TECLAS] para instrucciones"
    );
    text.setAlign("center");
    text.setWordWrapWidth(350);
    text.setOrigin(0.5)
  }

  createControls() {
    this.enter = this.input.keyboard.addKey("enter");
    this.enter.onDown = (e) => {
      this.start();
    }
  }

  createMusic() {
    this.sound.stopAll();
    this.sound.play("intro", {
      volume: 0.5
    });
  }

  start() {
    this.sound.stopAll();
    this.scene.start("MainScene");
  }
}