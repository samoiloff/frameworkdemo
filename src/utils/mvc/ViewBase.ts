import {ModelBase} from "./ModelBase";

/**
 * Base class for Views. Views are responsible for visual presentation
 */
export abstract class ViewBase {

    constructor(protected model: ModelBase) {
    }

    destroy(): void {
        this.model = null;
    }

}
