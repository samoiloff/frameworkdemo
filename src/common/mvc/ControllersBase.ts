import {ControllerBase} from "./ControllerBase";
import {ModelBase} from "./ModelBase";
import {ViewBase} from "./ViewBase";

export abstract class ControllersBase extends ControllerBase {

    protected controllers: Record<any, ControllerBase>;

    constructor(model: ModelBase, view: ViewBase) {
        super(model, view);
    }

    initialize() {
        this.controllers = {};
    }

    addController(controllerCls: new (model: ModelBase, view: ViewBase) => ControllerBase): void {
        const controller: ControllerBase = controllerCls[controllerCls.toString()];
        if (controller) {
            throw new Error(this + " already has controller with name : " + controller);
        } else {
            this.controllers[controllerCls.toString()] = new controllerCls(this.model, this.view);
        }
    }

    removeController(controllerCls: new (model: ModelBase, view: ViewBase) => ControllerBase): void {
        const controller: ControllerBase = controllerCls[controllerCls.toString()];
        controller.destroy();
        delete controllerCls[controllerCls.toString()];
    }

    removeAllControllers(): void {
        for (const field of Object.keys(this.controllers)) {
            const controller: ControllerBase = this.controllers[field];
            if (controller) {
                controller.destroy();
                delete this.controllers[field];
            }
        }
    }

}

