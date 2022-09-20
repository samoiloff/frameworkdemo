import {CounterEvent} from "./CounterEvent";
import {ModelBase} from "../utils/mvc/ModelBase";

/**
 * usually development starts with model.
 * model contains no business logic, thus links to model don't rise code complexity
 */
export class CounterModel extends ModelBase {

  isBlank: boolean = true;
  isRunning: boolean;
  currentWin: number = 0;

  constructor() {
    super();
  }

  setIsRunning(value: boolean): void {
    if (value !== this.isRunning) {
      this.isRunning = value;
      this.dispatch(CounterEvent.IS_RUNNING_CHANGED, this.isRunning);
    }

    if (this.isBlank && this.isRunning) {
      this.isBlank = false;
      this.dispatch(CounterEvent.IS_BLANK_CHANGED, this.isBlank);
    }
  }

  setCurrentWin(value: number): void {
    this.currentWin = value;
    this.dispatch(CounterEvent.CURRENT_WIN_CHANGED, this.currentWin);
  }

  reset(): void {
    this.setIsRunning(false);

    this.currentWin = 0;
    this.isBlank = true;
    this.dispatch(CounterEvent.IS_BLANK_CHANGED, this.isBlank);
  }

}