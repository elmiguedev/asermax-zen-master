import Phaser from "phaser"

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene")
  }

  create() {
    this.createFace();
    this.createIntroText();
    this.createInstructionsText();
    this.createKeysText();
    this.createControls();
    this.createMusic();
  }

  createFace() {
    // aca va la cara del prota 

    // this.face = this.add.image(240, 200, "marvin_rage_1");
    // this.face.setScale(2);
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