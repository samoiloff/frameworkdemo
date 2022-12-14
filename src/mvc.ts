import {ModelBase} from "./utils/mvc/ModelBase";
import {dGet} from "./utils/di/dGet";
import {dMap} from "./utils/di/dMap";

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
  winTitle: any;
  incButton: any;

  protected model: SceneModel = dGet(SceneModel);

  private controller: SceneController;

  constructor() {
    jQuery("body").append("<div id='winTitle' class='elem'>Hello World!!!</div>");
    jQuery("body").append("<div id='incButton' class='elem'><button id='incBtn' type='button' >Increment Win</button></div>");

    this.winTitle = jQuery("#winTitle");
    this.incButton = jQuery("#incBtn");

    this.controller = dGet(SceneController, [this]); // add controller (mediator)
  }

}

export class SceneController {
  protected model: SceneModel = dGet(SceneModel);

  constructor(protected view: SceneView) {
    this.initialize();
  }

  initialize(): void {
    this.view.incButton.on("click", () => {
      (dGet(SceneModel) as SceneModel).setCurrentWin(this.model.currentWin + 1);
    });

    this.model.addListener(SceneEvent.CURRENT_WIN_CHANGED, (currentWin: number) => {
      this.view.winTitle.text(currentWin.toString());
    }, this);
  }

}

// map classes for injector
dMap(SceneModel).asSingletone();
dMap(SceneView).asSingletone();
dMap(SceneController).asSingletone();

// instantiate Scene
dGet(SceneView);