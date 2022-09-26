import {SceneControllerBase} from "../../Scenes/controllers/SceneControllerBase";
import {GambleModel} from "../model/GambleModel";
import {dGet} from "../../utils/di/dGet";
import {GambleView} from "../view/GambleView";
import {GambleEvent} from "../events/GambleEvent";
import {SceneKey} from "../scenes/SceneKey";

export class ResultSceneController extends SceneControllerBase {

  model: GambleModel = dGet(GambleModel);
  view: GambleView = dGet(GambleView);

  initialize(): void {
    this.model.addListener(GambleEvent.RESULT_OK, this.onResultOk, this);
  }

  private onResultOk(): void {
    this.model.setCurrentScene(SceneKey.GAMBLE_SCENE);
  }

}