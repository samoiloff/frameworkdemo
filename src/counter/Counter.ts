import {CounterModel} from "./CounterModel";
import {CounterView} from "./CounterView";
import {CounterController} from "./controllers/CounterController";
import {ComponentBase} from "../utils/mvc/ComponentBase";

export class Counter extends ComponentBase {
  constructor() {
    super(
      CounterModel,
      CounterView,
      CounterController
    );
  }
}