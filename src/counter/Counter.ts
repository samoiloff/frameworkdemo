import {ComponentBase} from "../common/mvc/ComponentBase";
import {CounterModel} from "./CounterModel";
import {CounterView} from "./CounterView";
import {CounterController} from "./controllers/CounterController";

export class Counter extends ComponentBase {
  constructor() {
    super(
      CounterModel,
      CounterView,
      CounterController
    );
  }
}