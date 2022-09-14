import {DiContext} from "../di/DiContext";

export class InjectionData {
  keyCls: any;
  instanceCls: any;
  isSingletone: boolean;
  initParams?: any[];
  instance: any;

  asSingletone(value: boolean = true): InjectionData {
    this.isSingletone = value;
    return this;
  }

  withParams(value: any[]): InjectionData {
    this.initParams = value;
    return this;
  }

  toClass(value: any): InjectionData {
    this.instanceCls = value;
    return this;
  }

}
export type IContextData = Map<any, InjectionData>;
export type IContexts = Map<string, DiContext>;