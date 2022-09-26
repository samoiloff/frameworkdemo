import Phaser from "phaser";
import {BootScene} from "../scenes/BootScene";
import {GambleScene} from "../scenes/GambleScene";
import {ViewBase} from "../../utils/mvc/ViewBase";
import {GambleModel} from "../model/GambleModel";
import {GambleEvent} from "../events/GambleEvent";
import {dGet} from "../../utils/di/dGet";
import {ResultScene} from "../scenes/ResultScene";

export class GambleView extends ViewBase {

  model: GambleModel;
  game: Phaser.Game;

  constructor(model: GambleModel) {
    super(model);

    const config: Phaser.Types.Core.GameConfig = {
      // type: Phaser.WEBGL,
      // parent: 'phaser-example',
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: [
        BootScene,
        GambleScene,
        ResultScene,
      ]
    };

    this.game = new Phaser.Game(config);
  }

}