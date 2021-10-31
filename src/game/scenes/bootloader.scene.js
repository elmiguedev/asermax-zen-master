import Phaser, { Scene } from "phaser";
import musicMp3 from "../assets/sounds/music.mp3";
import introMp3 from "../assets/sounds/intro.mp3";
import gameoverMp3 from "../assets/sounds/gameover.mp3";
import zenMp3 from "../assets/sounds/zen.mp3";
import zenFailMp3 from "../assets/sounds/zen_fail_2.mp3";
import noiseMp3 from "../assets/sounds/noise.mp3";

import cosoPng from "../assets/img/coso.png";
import asermaxPng from "../assets/img/asermax.png";
import asermaxBurnoutPng from "../assets/img/asermax_burnout.png";
import backgroundPng from "../assets/img/background.png";
import zenBallPng from "../assets/img/zenBall.png";
import zenMarkPng from "../assets/img/zenMark.png";
import firePng from "../assets/img/fire.png";
import stressMarkPng from "../assets/img/stress_mark.png";

export default class BootloaderScene extends Scene {
  constructor() {
    super("BootloaderScene");
  }

  preload() {

    this.load.audio("intro", [introMp3]);
    this.load.audio("gameover", [gameoverMp3]);
    this.load.audio("music", [musicMp3]);
    this.load.audio("zen", [zenMp3]);
    this.load.audio("zenFail", [zenFailMp3]);
    this.load.audio("noise", [noiseMp3]);

    this.load.image("coso", cosoPng);
    this.load.image("stressMark", stressMarkPng);
    this.load.image("asermax", asermaxPng);
    this.load.image("asermaxBurnout", asermaxBurnoutPng);
    this.load.image("background", backgroundPng);
    this.load.image("zenBall", zenBallPng);
    this.load.spritesheet("zenMark", zenMarkPng, {
      frameWidth: 256,
      frameHeight: 140
    })
    this.load.spritesheet("fire", firePng, {
      frameWidth: 480,
      frameHeight: 180
    })

    this.load.on("complete", () => {
      this.scene.start("StartScene");
    });
  }

  create() {
  }
}