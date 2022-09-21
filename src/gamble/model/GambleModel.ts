import {ModelBase} from "../../utils/mvc/ModelBase";
import {GambleEvent} from "../events/GambleEvent";

export class GambleModel extends ModelBase {

  isWin: boolean;
  currentScene: string;
  balance: number = 100;

  calculateIsWin(): boolean {
    this.isWin = Math.random() > 0.5;
    return this.isWin;
  }

  setCurrentScene(currentScene: string): void {
    this.currentScene = currentScene;
    this.dispatch(GambleEvent.SCENE_CHANGED);
  }

}