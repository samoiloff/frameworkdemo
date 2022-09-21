import {GambleView} from "./view/GambleView";
import {GambleModel} from "./model/GambleModel";
import {dInject} from "../utils/di/dInject";
import {GambleController} from "./controller/GambleController";

export class Gamble {

  protected model: GambleModel;
  protected view: GambleView;
  protected controller: GambleController;

  constructor() {
    this.model = dInject(GambleModel);
    this.view = dInject(GambleView);
    this.controller = dInject(GambleController, [this.model, this.view]);
    this.controller.initialize();
  }

}