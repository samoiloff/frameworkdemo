import {CounterModel} from "../CounterModel";
import {CounterEvent} from "../CounterEvent";
import {CounterView} from "../CounterView";
import {ControllerBase} from "../../utils/mvc/ControllerBase";

export class CounterLabelController extends ControllerBase {

  protected model: CounterModel;
  protected view: CounterView;

  initialize(): void {
    this.model.addListener(CounterEvent.CURRENT_WIN_CHANGED, this.onChange, this);
    this.model.addListener(CounterEvent.IS_BLANK_CHANGED, this.onChange, this);
    this.onChange();
  }

  private onChange(data?: any): void {
    if (this.model.isBlank) {
      this.view.setLabelText("Click Start");
    } else {
      this.view.setLabelText(this.model.currentWin.toString());
    }
  }

}