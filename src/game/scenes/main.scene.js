import Phaser, { Scene } from "phaser"

export default class MainScene extends Scene {
    constructor() {
        super("MainScene");
    }

    // game loop methods
    // ---------------------

    create() {
        this.createAnimations();
        this.createBackground();
        this.createScore();
        this.createAsermax();
        this.createZenBall();
    }

    // creation methods
    // ---------------------

    createProperties() {
        this.zenSpeed = 100;
    }

    createAnimations() {

    }

    createScore() {

    }

    createBackground() {

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

    createZenBall() {
        const x = this.asermax.x;
        const y = this.asermax.y - 120;
        this.zenBall = this.add.rectangle(
            x,
            y,
            20,
            20,
            0xffffff
        );


    }
}