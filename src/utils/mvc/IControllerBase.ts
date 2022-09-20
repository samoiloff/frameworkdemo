import {ModelBase} from "./ModelBase";
import {ViewBase} from "./ViewBase";
import {ControllerBase} from "./ControllerBase";

/**
 * interface for controllers
 */
export interface IControllerBase  {new (model: ModelBase, view: ViewBase): ControllerBase};
