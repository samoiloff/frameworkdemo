import {ModelBase} from "./ModelBase";
import {ViewBase} from "./ViewBase";
import {ControllerBase} from "./ControllerBase";
import {IControllerBase} from "./IControllerBase";
import diInject from "../di/diInject";
import {DebugUtils} from "../utils/DebugUtils";

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
        this.model = diInject(modelCls, [this]);
        this.view = diInject(viewCls, [this.model]);
        this.controllerBase = diInject(controllerCls, [this.model, this.view]);
        DebugUtils.mapObjectToGlobalId(this, this.constructor["name"], "p");
    }

    getModel(): ModelBase {
        return this.model;
    }

}
