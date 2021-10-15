import Phaser, { Game } from "phaser"
import BootloaderScene from "./scenes/bootloader.scene";
import GameoverScene from "./scenes/gameover.scene";
import MainScene from "./scenes/main.scene";
import StartScene from "./scenes/start.scene";

export default new Game({
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: document.getElementById("canvas"),
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 480,
        height: 640
    },
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