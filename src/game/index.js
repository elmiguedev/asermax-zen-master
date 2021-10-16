import Phaser, { Game } from "phaser"
import BootloaderScene from "./scenes/bootloader.scene";
import GameoverScene from "./scenes/gameover.scene";
import MainScene from "./scenes/main.scene";
import StartScene from "./scenes/start.scene";

export default new Game({
  type: Phaser.AUTO,
  parent: document.getElementById("canvas"),
  width: 480,
  height: 720,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0
      }
    }
  },
  scene: [
    BootloaderScene,
    StartScene,
    MainScene,
    GameoverScene
  ]
});