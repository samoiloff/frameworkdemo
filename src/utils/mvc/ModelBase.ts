import {EventDispatcher} from "./EventDispatcher";

/**
 * Base class for Models.
 * Model stores data and serve as event-tyre for the application.
 * The event tyre realized on eventemitter3:
 * https://www.npmjs.com/package/eventemitter3
 */

export abstract class ModelBase extends EventDispatcher {

    destroy(): void {
        this.removeAllListeners();
    }
}
