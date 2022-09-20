import {CounterEvent} from "../CounterEvent";
import {CounterModel} from "../CounterModel";
import {ControllerBase} from "../../utils/mvc/ControllerBase";

export class CounterTimerController extends ControllerBase {

  protected model: CounterModel;

  private timerId: number = -1;

  initialize(): void {
    this.model.addListener(CounterEvent.IS_RUNNING_CHANGED, this.onIsRunningChanged, this);
  }

  private onIsRunningChanged(isRunning: boolean): void {
    if (this.timerId >= 0) {
      window.clearInterval(this.timerId);
      this.timerId = -1;
    }

    if (this.model.isRunning) {
      this.timerId = window.setInterval(() => {
        this.model.setCurrentWin(this.model.currentWin + 1);
      }, 1000);
    }
  }
}