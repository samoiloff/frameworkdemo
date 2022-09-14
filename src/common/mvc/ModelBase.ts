import {EventDispatcher} from "./EventDispatcher";
import {DebugUtils} from "../utils/DebugUtils";

/**
 * model class, store data and can serve as event-tire since it extends EventDispatcher
 */

export abstract class ModelBase extends EventDispatcher {

    constructor() {
        super();
        DebugUtils.mapObjectToGlobalId(this, this.constructor["name"], "m");
    }

    destroy(): void {
        super.removeAllListeners();
    }
}
