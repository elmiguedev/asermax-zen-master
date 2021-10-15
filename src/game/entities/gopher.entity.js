import Phaser from "phaser"

export default class Gopher extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "gopher");
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.createInteraction();
        this.createProps();
    }

    // methods
    // ----------------------

    createProps() {
        this.punchable = false;
        this.speed = 3000;
        this.onPunch = null;
        this.onHide = null;
        this.type = "normal";
    }

    createInteraction() {
        this.setInteractive({ cursor: "pointer" })
        this.on("pointerdown", (e) => {
            if (this.punchable) {
                this.punch();
            }
        })
    }

    show() {
        if (!this.punchable) {
            this.punchable = true;
            this.play({
                key: this.texture.key + "_show",
                frameRate: 30
            }, true);
            this.timer = setTimeout(() => {
                this.hide();
                if (this.onHide) {
                    this.onHide(this);
                }
            }, this.speed);
        }
    }

    hide() {
        this.punchable = false;
        this.play({
            key: this.texture.key + "_hide",
            frameRate: 30
        }, true);
    }

    punch() {
        if (this.timer) clearTimeout(this.timer);
        this.hide();
        if (this.onPunch) {
            this.onPunch(this);
        }
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    setType(type) {
        this.type = type;
        switch (this.type) {
            case "rasta":
                this.setTexture("gopherRasta")
                break;

            case "bad":
                this.setTexture("gopherBad")
                break;

            case "normal":
            default:
                this.setTexture("gopher")
                break;

        }
    }


}