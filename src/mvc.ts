import {ModelBase} from "./utils/mvc/ModelBase";
import {diInject} from "./utils/di/diInject";
import {diMap} from "./utils/di/diMap";

const jQuery = require("jquery");

export const SceneEvent = {
  CURRENT_WIN_CHANGED: "SceneEvent.CURRENT_WIN_CHANGED"
}

class SceneModel extends ModelBase {

  currentWin: number = 0;

  setCurrentWin(value: number): void {
    this.currentWin = value;
    this.dispatch(SceneEvent.CURRENT_WIN_CHANGED, this.currentWin);
  }

}

export class SceneView {

  protected model: SceneModel = diInject(SceneModel);

  public winTitle;
  public incButton;

  private controller: SceneController;

  constructor() {
    jQuery("body").append("<div id='winTitle' class='elem'>Hello World!!!</div>");
    jQuery("body").append("<div id='incButton' class='elem'><button id='incBtn' type='button' >Increment Win</button></div>");

    this.winTitle = jQuery("#winTitle");
    this.incButton = jQuery("#incBtn");

    this.controller = diInject(SceneController, [this]); // add controller (mediator)
  }

}

export class SceneController {
  protected model: SceneModel = diInject(SceneModel);

  constructor(protected view: SceneView) {
    this.initialize();
  }

  initialize(): void {
    this.view.incButton.on("click", () => {
      (diInject(SceneModel) as SceneModel).setCurrentWin(this.model.currentWin + 1);
    });

    this.model.addListener(SceneEvent.CURRENT_WIN_CHANGED, (currentWin: number) => {
      this.view.winTitle.text(currentWin.toString());
    }, this);
  }

}

// map classes for injector
diMap(SceneModel).asSingletone();
diMap(SceneView).asSingletone();
diMap(SceneController).asSingletone();

// instantiate Scene
diInject(SceneView);