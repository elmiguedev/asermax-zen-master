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
        this.createFace();
        this.createGameoverText();
        this.createInstructionsText();
        this.createScoreText();
        this.createControls();
        this.createMusic();
    }

    createMusic() {
        this.sound.play("gameover", {
            volume: 0.5
        });
    }

    createFace() {
        // aca va la cara del prota, perdiendo

        //this.face = this.add.image(240, 200, "marvin_rage_5");
        //this.face.setScale(2);
    }

    createGameoverText() {
        const text = this.add.text(
            240,
            400,
            "- frase del prota perdiendo -",
        );
        text.setAlign("center");
        text.setWordWrapWidth(350);
        text.setOrigin(0.5)
    }

    createInstructionsText() {
        const text = this.add.text(
            240,
            600,
            "Presiona [AQUI] para darle otra oportunidad al Marvin de que se calme"
        );
        text.setAlign("center");
        text.setWordWrapWidth(350);
        text.setOrigin(0.5);
        text.setInteractive({ cursor: "pointer" });
        text.on("pointerdown", () => {
            this.start();
        })
    }

    createScoreText() {
        const text = this.add.text(
            240,
            500,
            `Tu puntaje fue de ${this.score} -prota coins-`
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

    start() {
        this.sound.stopAll();
        this.scene.start("MainScene");
    }
}