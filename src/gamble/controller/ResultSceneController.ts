import {SceneControllerBase} from "../../Scenes/controllers/SceneControllerBase";
import {GambleModel} from "../model/GambleModel";
import {dInject} from "../../utils/di/dInject";
import {GambleView} from "../view/GambleView";
import {GambleEvent} from "../events/GambleEvent";
import {SceneKey} from "../scenes/SceneKey";

export class ResultSceneController extends SceneControllerBase {

  model: GambleModel = dInject(GambleModel);
  view: GambleView = dInject(GambleView);

  initialize(): void {
    this.model.addListener(GambleEvent.RESULT_OK, this.onResultOk, this);
  }

  private onResultOk(): void {
    this.model.setCurrentScene(SceneKey.GAMBLE_SCENE);
  }

}