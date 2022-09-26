import {SceneControllerBase} from "../../Scenes/controllers/SceneControllerBase";
import {GambleScene} from "../scenes/GambleScene";
import {GambleModel} from "../model/GambleModel";
import {dGet} from "../../utils/di/dGet";
import {GambleEvent} from "../events/GambleEvent";
import {SceneKey} from "../scenes/SceneKey";
import {GambleView} from "../view/GambleView";

export class GambleSceneController extends SceneControllerBase {

  scene: GambleScene;
  model: GambleModel = dGet(GambleModel);
  view: GambleView = dGet(GambleView);

  initialize(): void {
    this.model.addListener(GambleEvent.RED_CLICK, this.onChoiceClick, this);
    this.model.addListener(GambleEvent.BLACK_CLICK, this.onChoiceClick, this);
  }

  private onChoiceClick(): void {
    const isWin: boolean = this.model.calculateIsWin();
    if (isWin) {
      this.model.balance += 1;
    } else {
      this.model.balance -= 1;
    }
    this.model.setCurrentScene(SceneKey.RESULT_SCENE);
  }

}