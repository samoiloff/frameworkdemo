import {GambleView} from "./view/GambleView";
import {GambleModel} from "./model/GambleModel";
import {dGet} from "../utils/di/dGet";
import {GambleController} from "./controller/GambleController";

export class Gamble {

  protected model: GambleModel;
  protected view: GambleView;
  protected controller: GambleController;

  constructor() {
    this.model = dGet(GambleModel);
    this.view = dGet(GambleView);
    this.controller = dGet(GambleController, [this.model, this.view]);
    this.controller.initialize();
  }

}