import {EventEmitter} from "eventemitter3";
import Logger from "../Logger";

/**
 * EventDispatcher.
 * Added logging functionality, that is bound to Logger.isShowLog flag
 * TODO: move Logger.isShowLog to global variables, set by webpack DefinePlugin from env vars
 */
export class EventDispatcher extends EventEmitter {

  dispatch(event: string, data?: any): void {
    this.emit(event, data);
  }

  emit(event: string | symbol, data?: any): boolean {
    if (Logger.getIsShowLog()) {
      this.logEvent(event, data);
    }

    return super.emit(event, data);
  }

  /**
   * expandable trace
   * @param event
   * @param data
   */
  protected logEvent(event: string | symbol, data?: any): void {
    console.groupCollapsed(`${this.constructor.name}: ${event.toString()}`);
    console.log(data !== null ? data : "-=NO_DATA=-");
    console.trace();
    console.groupEnd();
  }
}
