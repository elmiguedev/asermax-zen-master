import Phaser, { Scene } from "phaser";
import musicMp3 from "../assets/sounds/music.mp3";
import introMp3 from "../assets/sounds/intro.mp3";
import gameoverMp3 from "../assets/sounds/gameover.mp3";

import cosoPng from "../assets/img/coso.png";

export default class BootloaderScene extends Scene {
    constructor() {
        super("BootloaderScene");
    }

    preload() {

        this.load.audio("intro", [introMp3]);
        this.load.audio("gameover", [gameoverMp3]);
        this.load.audio("music", [musicMp3]);

        this.load.image("coso", cosoPng);

        this.load.on("complete", () => {
            this.scene.start("StartScene");
        });
    }

    create() {
    }
}