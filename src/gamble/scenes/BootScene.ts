import Phaser from "phaser";
import {SceneKey} from "./SceneKey";
import {MvcScene} from "../../Scenes/MvcScene";
import {dGet} from "../../utils/di/dGet";
import {BootSceneController} from "../controller/BootSceneController";
import {GambleView} from "../view/GambleView";
import {Gamble} from "../Gamble";
import {GambleModel} from "../model/GambleModel";
import {GambleEvent} from "../events/GambleEvent";

export class BootScene extends MvcScene {

  constructor() {
    super({
      key: SceneKey.BOOT_SCENE
    });
    this.addController(dGet(BootSceneController, [this]));
  }

  preload() {
    this.load.image('black', 'img/black.png');
    this.load.image('red', 'img/red.png');
    this.load.image('btn', 'img/btn.png');
  }

  create() {
    this.scene.sleep();
    (dGet(GambleModel) as GambleModel).dispatch(GambleEvent.BOOT_COMPLETE);
  }

}