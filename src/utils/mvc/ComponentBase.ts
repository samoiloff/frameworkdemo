import {ModelBase} from "./ModelBase";
import {ViewBase} from "./ViewBase";
import {ControllerBase} from "./ControllerBase";
import {IControllerBase} from "./IControllerBase";
import {dInject} from "../di/dInject";

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
        this.model = dInject(modelCls, [this]);
        this.view = dInject(viewCls, [this.model]);
        this.controllerBase = dInject(controllerCls, [this.model, this.view]);
        this.controllerBase.initialize();
    }

    getModel(): ModelBase {
        return this.model;
    }

}
