import Phaser from "phaser"

export default class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene")
  }

  create() {
    this.createOpacityContainer();
    this.createBackground();
    this.createProta();
    this.createIntroText();
    this.createInstructionsText();
    this.createKeysText();
    this.createControls();
    this.createMusic();
  }

  createOpacityContainer() {
    this.opacityContainer = this.add.group();
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

    this.asermaxTween = this.tweens.add({
      targets: this.asermax,
      ease: "Sine.easeInOut",
      y: {
        from: this.asermax.y,
        to: this.asermax.y - 10
      },
      duration: 2500,
      repeat: -1,
      yoyo: true
    })
  }

  createIntroText() {
    const text = this.add.text(
      240,
      80,
      `Asermax está meditando luego de una gran jornada de trabajo para poder evitar el stress`,
      {
        fontFamily: "'pxll'",
        fontSize: 32,
        color: "#000000"
      }
    );
    text.setAlpha(0.7);
    text.setAlign("center");
    text.setWordWrapWidth(350);
    text.setOrigin(0.5);
    text.setLineSpacing(10);

    const text2 = this.add.text(
      240,
      180,
      `¿Podrás ayudarlo a alinear sus chakras y combatir contra el burnout 🔥?`,
      {
        fontFamily: "'pxll'",
        fontSize: 32,
        color: "#000000",
      }
    );
    text2.setLineSpacing(10);
    text2.setAlpha(0.7);
    text2.setAlign("center");
    text2.setWordWrapWidth(350);
    text2.setOrigin(0.5);

    this.opacityContainer.add(text);
    this.opacityContainer.add(text2);

  }

  createInstructionsText() {
    const text = this.add.text(
      240,
      540,
      `Presiona sobre la pantalla para alinear los chakras de Asermax`,
      {
        fontFamily: "'pxll'",
        fontSize: 32,
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

  createKeysText() {
    const text = this.add.text(
      240,
      640,
      `COMENZAR`,
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

  createControls() {
    this.enter = this.input.keyboard.addKey("enter");
    this.space = this.input.keyboard.addKey("space");
    this.enter.onDown = (e) => {
      this.start();
    }
    this.space.onDown = (e) => {
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
    this.asermaxTween.stop();
    this.tweens.add({
      targets: this.asermax,
      ease: "Sine.easeInOut",
      y: {
        from: this.asermax.y,
        to: this.game.canvas.height / 2
      },
      duration: 1000
    });
    this.tweens.add({
      targets: this.opacityContainer.children.getArray(),
      alpha: {
        from: 0.7,
        to: 0
      },
      duration: 1000,
      onComplete: () => {
        this.sound.stopAll();
        this.scene.start("MainScene");
      }
    })

  }
}