import {ModelBase} from "./ModelBase";
import {ViewBase} from "./ViewBase";

export abstract class ControllerBase {

    constructor(protected model: ModelBase, protected view: ViewBase) {

    }

    abstract initialize(): void;

    destroy(): void {

    }

}

