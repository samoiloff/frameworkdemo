import {ModelBase} from "./ModelBase";
import {DebugUtils} from "../utils/DebugUtils";

/**
 * view. it's responsible for visual presentation
 */
export abstract class ViewBase {

    constructor(protected model: ModelBase) {
        DebugUtils.mapObjectToGlobalId(this, this.constructor["name"], "v");
    }

    destroy(): void {
        this.model = null;
    }

}
