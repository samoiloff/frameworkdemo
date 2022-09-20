
import {CounterModel} from "./CounterModel";
import {ViewBase} from "../utils/mvc/ViewBase";
const jQuery = require("jquery");

/**
 * view contains visual elements, it has injected model and it can modify the model
 */
export class CounterView extends ViewBase {

  protected model: CounterModel;

  private timerTitle;
  private startButton;
  private stopButton;
  private resetButton;

  constructor(model: CounterModel) {
    super(model);
    console.log("CounterView");
    jQuery("body").append("<div id='timerTitle' class='elem'>Hello World!!!</div>");
    jQuery("body").append("<div id='startButton' class='elem'><button id='startBtn' type='button' >Start Timer</button></div>");
    jQuery("body").append("<div id='stopButton' class='elem'><button id='stopBtn' type='button' >Stop Timer</button></div>");
    jQuery("body").append("<div id='resetButton' class='elem'><button id='resetBtn' type='button' >Reset Timer</button></div>");

    this.timerTitle = jQuery("#timerTitle");
    this.startButton = jQuery("#startBtn");
    this.stopButton = jQuery("#stopBtn");
    this.resetButton = jQuery("#resetBtn");

    this.startButton.on("click", () => {
      this.model.setIsRunning(true);
    });

    this.stopButton.on("click", () => {
      this.model.setIsRunning(false);
    });

    this.resetButton.on("click", () => {
      this.model.reset();
    });

  }

  setLabelText(text: string): void {
    this.timerTitle.text(text);
  }
}