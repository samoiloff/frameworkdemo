import {SceneControllerBase} from "../../Scenes/controllers/SceneControllerBase";
import {GambleModel} from "../model/GambleModel";
import {GambleEvent} from "../events/GambleEvent";
import {dInject} from "../../utils/di/dInject";
import {GambleView} from "../view/GambleView";
import {SceneKey} from "../scenes/SceneKey";

export class BootSceneController extends SceneControllerBase {

  model: GambleModel = dInject(GambleModel);
  view: GambleView = dInject(GambleView);

  initialize(): void {
    this.model.addListener(GambleEvent.BOOT_COMPLETE, this.onBootComplete, this);
  }

  onBootComplete(): void {
    this.model.setCurrentScene(SceneKey.GAMBLE_SCENE);
  }

}