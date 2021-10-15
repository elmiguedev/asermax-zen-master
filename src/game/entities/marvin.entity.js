import Phaser from "phaser";

export default class Marvin extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, "marvin_rage_1");
        this.scene.add.existing(this);
        this.setScale(2);
        this.rage = 0;
        this.maxRage = 100;
    }

    increaseRage(rage) {
        if (rage)
            this.rage += rage;
        else
            this.rage++;
        this.checkTexture();
    }

    setRage(rage) {
        this.rage = rage;
    }

    checkTexture() {
        if (this.rage < 20) {
            this.setTexture("marvin_rage_1");
            return;
        }
        if (this.rage < 40) {
            this.setTexture("marvin_rage_2");
            return;
        }
        if (this.rage < 60) {
            this.setTexture("marvin_rage_3");
            return;
        }
        if (this.rage < 80) {
            this.setTexture("marvin_rage_4");
            return;
        }

        this.setTexture("marvin_rage_5");

    }
}