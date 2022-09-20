import {InjectionData} from "./di/InjectionData";
import {DiContext} from "./di/DiContext";

export type IContextData = Map<any, InjectionData>;
export type IContexts = Map<string, DiContext>;
export type IResolveFunction = (param?: any) => any;