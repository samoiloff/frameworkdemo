import {EventEmitter} from "eventemitter3";

/**
 * eventdispatcher. logging is commented
 */
export class EventDispatcher extends EventEmitter {
     logEventsEnabled: boolean = false;
     instanceId: string = "EventDispatcher";

    dispatch(event: string, data?: any): void {
        this.emit(event, data);
    }

     emit(event: string | symbol, data?: any): boolean {
        if (this.logEventsEnabled) {
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
        console.groupCollapsed(`${this.instanceId}: ${event.toString()}`);
        console.log(data !== null ? data : "-=NO_DATA=-");
        console.trace();
        console.groupEnd();
    }
}
