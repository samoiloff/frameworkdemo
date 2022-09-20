import {dInject} from "./utils/di/dInject";
import {PersistentCommandQueue} from "./utils/commands/PersistentCommandQueue";
import {SingleRunCommandQueue} from "./utils/commands/SingleRunCommandQueue";
import {CommandResolveBase} from "./utils/commands/CommandResolveBase";
import {dMap} from "./utils/di/dMap";

const jQuery = require("jquery");

class SceneView {

  public counter: number = 0;

  public winTitle;
  public persistentButton;
  public singleButton;

  private persistentQueue: PersistentCommandQueue = new PersistentCommandQueue();
  private singleRunQueue: SingleRunCommandQueue = new SingleRunCommandQueue();

  constructor() {
    jQuery("body").append("<div id='winTitle' class='elem'>Hello World!!!</div>");
    jQuery("body").append("<div id='persistentButton' class='elem'><button id='persistentBtn' type='button' >Start Persistent</button></div>");
    jQuery("body").append("<div id='singleButton' class='elem'><button id='singleBtn' type='button' >Start Single Run</button></div>");

    this.winTitle = jQuery("#winTitle");
    this.persistentButton = jQuery("#persistentBtn");
    this.singleButton = jQuery("#singleBtn");

    this.persistentQueue.add(dInject(SetButtonsEnabledCmd, [false]))
    Array.from({length: 10}).forEach(() => {
      this.persistentQueue.add(dInject(IncrementCounterCmd));
    });
    this.persistentQueue.add(dInject(SetButtonsEnabledCmd, [true]));

    this.persistentButton.on("click", () => {
      this.persistentQueue.reset();
      this.persistentQueue.run();
    });

    this.singleButton.on("click", () => {
      this.singleRunQueue.add(dInject(SetButtonsEnabledCmd, [false]))
      Array.from({length: 10}).forEach(() => {
        this.singleRunQueue.add(dInject(IncrementCounterCmd, [-1]));
      });
      this.singleRunQueue.add(dInject(SetButtonsEnabledCmd, [true]));
      this.singleRunQueue.run();
    });

  }

}

class SetButtonsEnabledCmd  extends CommandResolveBase{

  constructor(protected enabled: boolean) {
    super();
  }

  protected internalRun(): void {
    const scene: SceneView = dInject(SceneView);
    scene.persistentButton.prop("disabled", !this.enabled);
    scene.singleButton.prop("disabled", !this.enabled);
    this.internalResolve();
  }
  
}

class IncrementCounterCmd extends CommandResolveBase {

  constructor(protected delta: number = 1) {
    super();
  }

  protected internalRun(): void {
    const scene: SceneView = dInject(SceneView);
    scene.counter += this.delta;
    scene.winTitle.text(scene.counter);
    setTimeout(() => {
      this.internalResolve();
    }, 500);
  }
  
}

// map classes for injector
dMap(SceneView).asSingletone();
dMap(SetButtonsEnabledCmd);
dMap(IncrementCounterCmd);

// instantiate Scene
dInject(SceneView);