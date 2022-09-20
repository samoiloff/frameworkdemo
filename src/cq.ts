import {diInject} from "./utils/di/diInject";
import {PersistentCommandQueue} from "./utils/commands/PersistentCommandQueue";
import {SingleRunCommandQueue} from "./utils/commands/SingleRunCommandQueue";
import {CommandResolveBase} from "./utils/commands/CommandResolveBase";
import {diMap} from "./utils/di/diMap";

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

    this.persistentQueue = new PersistentCommandQueue();
    this.singleRunQueue = new SingleRunCommandQueue();

    this.persistentQueue.add(diInject(SetButtonsEnabledCmd, [false]))
    Array.from({length: 10}).forEach(() => {
      this.persistentQueue.add(diInject(IncrementCounterCmd));
    });
    this.persistentQueue.add(diInject(SetButtonsEnabledCmd, [true]));

    this.persistentButton.on("click", () => {
      this.persistentQueue.reset();
      this.persistentQueue.run();
    });

    this.singleButton.on("click", () => {
      this.singleRunQueue.add(diInject(SetButtonsEnabledCmd, [false]))
      Array.from({length: 10}).forEach(() => {
        this.singleRunQueue.add(diInject(IncrementCounterCmd, [-1]));
      });
      this.singleRunQueue.add(diInject(SetButtonsEnabledCmd, [true]));
      this.singleRunQueue.run();
    });

  }

}

class SetButtonsEnabledCmd  extends CommandResolveBase{

  constructor(protected enabled: boolean) {
    super();
  }

  protected internalRun(): void {
    const scene: SceneView = diInject(SceneView);
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
    const scene: SceneView = diInject(SceneView);
    scene.counter += this.delta;
    scene.winTitle.text(scene.counter);
    setTimeout(() => {
      this.internalResolve();
    }, 500);
  }
  
}

// map classes for injector
diMap(SceneView).asSingletone();
diMap(SetButtonsEnabledCmd);
diMap(IncrementCounterCmd);

// instantiate Scene
diInject(SceneView);