import {ModelBase} from "./ModelBase";
import {ViewBase} from "./ViewBase";
import {ControllerBase} from "./ControllerBase";

export interface IControllerBase  {new (model: ModelBase, view: ViewBase): ControllerBase};
