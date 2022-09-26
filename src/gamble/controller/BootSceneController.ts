import {SceneControllerBase} from "../../Scenes/controllers/SceneControllerBase";
import {GambleModel} from "../model/GambleModel";
import {GambleEvent} from "../events/GambleEvent";
import {dGet} from "../../utils/di/dGet";
import {GambleView} from "../view/GambleView";
import {SceneKey} from "../scenes/SceneKey";

export class BootSceneController extends SceneControllerBase {

  model: GambleModel = dGet(GambleModel);
  view: GambleView = dGet(GambleView);

  initialize(): void {
    this.model.addListener(GambleEvent.BOOT_COMPLETE, this.onBootComplete, this);
  }

  onBootComplete(): void {
    this.model.setCurrentScene(SceneKey.GAMBLE_SCENE);
  }

}