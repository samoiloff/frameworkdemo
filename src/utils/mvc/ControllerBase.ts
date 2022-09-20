import {ModelBase} from "./ModelBase";
import {ViewBase} from "./ViewBase";

export abstract class ControllerBase {

    constructor(protected model: ModelBase, protected view: ViewBase) {
        this.initialize();
    }

    abstract initialize(): void;

    destroy(): void {
        this.model = null;
        this.view = null;
    }

}

