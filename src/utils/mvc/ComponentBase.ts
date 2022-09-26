import {ModelBase} from "./ModelBase";
import {ViewBase} from "./ViewBase";
import {ControllerBase} from "./ControllerBase";
import {IControllerBase} from "./IControllerBase";
import {dGet} from "../di/dGet";

/**
 * Component which realizes MVC pattern
 */
export abstract class ComponentBase {

    protected model: ModelBase;
    protected view: ViewBase;
    protected controllerBase: ControllerBase;

    constructor(
            modelCls: new (component: ComponentBase) => ModelBase,
            viewCls: new (model: ModelBase) => ViewBase,
            controllerCls: IControllerBase) {
        this.model = dGet(modelCls, [this]);
        this.view = dGet(viewCls, [this.model]);
        this.controllerBase = dGet(controllerCls, [this.model, this.view]);
        this.controllerBase.initialize();
    }

    getModel(): ModelBase {
        return this.model;
    }

}
