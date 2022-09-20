import {CounterTimerController} from "./CounterTimerController";
import {CounterLabelController} from "./CounterLabelController";
import {ControllersBase} from "../../utils/mvc/ControllersBase";
import {dInject} from "../../utils/di/dInject";

/**
 * no class shall control controller via link, since they contain business logic
 * controllers are low coupled with model and view via events
 */
export class CounterController extends ControllersBase {

  /**
   * component can have number of controllers, they have weak reference with model and view thus they can be
   * easily switched on and off.
   * I mean any of following controllers can be removed but application still will compile and operate but with
   * restricted functionality
   */
  initialize(): void {
    super.initialize();
    this.addController(dInject(CounterTimerController, [this.model, this.view]));
    this.addController(dInject(CounterLabelController, [this.model, this.view]));
  }

}