import {ControllerBase} from "./ControllerBase";

export abstract class ControllersBase extends ControllerBase {

    protected controllers: ControllerBase[];

    initialize() {
        this.controllers = [];
    }

    addController(controller: ControllerBase): void {
        this.controllers.push(controller);
        controller.initialize();
    }

    removeController(controller: ControllerBase): void {
        const controllerIndex: number = this.controllers.indexOf(controller);
        if (controllerIndex >= 0) {
            this.controllers.splice(controllerIndex, 1);
        }
    }

    removeAllControllers(): void {
        this.controllers.forEach((controller) => {
            controller.destroy();
        });
        this.controllers = [];
    }

}

