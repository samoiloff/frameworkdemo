import {ControllersBase} from "../../utils/mvc/ControllersBase";
import {GambleView} from "../view/GambleView";
import {GambleModel} from "../model/GambleModel";
import {GambleEvent} from "../events/GambleEvent";
import {MvcScene} from "../../Scenes/MvcScene";
import {GambleScene} from "../scenes/GambleScene";
import {SceneKey} from "../scenes/SceneKey";

export class GambleController extends ControllersBase {

  protected model: GambleModel;
  protected view: GambleView;

  protected scenesCreated = {
    [SceneKey.BOOT_SCENE]: true,
  };

  protected prevScene: string = SceneKey.BOOT_SCENE;

  constructor(model: GambleModel, view: GambleView) {
    super(model, view);

    this.model.addListener(GambleEvent.SCENE_CHANGED, this.onSceneChanged, this);
  }

  private onSceneChanged(): void {
    this.view.game.scene.sleep(this.prevScene);
    this.prevScene = this.model.currentScene;
    if (this.scenesCreated[this.model.currentScene]) {
      this.view.game.scene.wake(this.model.currentScene);
    } else {
      this.scenesCreated[this.model.currentScene] = true;
      this.view.game.scene.start(this.model.currentScene);
    }
  }

}