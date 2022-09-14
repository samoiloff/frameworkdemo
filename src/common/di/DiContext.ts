import {IContextData, InjectionData} from "./definitions";

/**
 * Depencency Injection Context. It stores Injections.
 */
export class DiContext {

  data: IContextData = new Map<any, InjectionData>();

  instantiate(cls: any, initParams?: any[]): any {
    const injection: InjectionData = this.data[cls.name];
    if (injection) {
      if (injection.isSingletone) {
        if (!injection.instance) {
          injection.instance = this.createInstance(injection, initParams);
        }
        return injection.instance;
      } else {
        return this.createInstance(injection, initParams);
      }
    } else {
      throw new Error("Injection not found : " + cls.name);
    }

  }

  protected createInstance(injection: InjectionData, initParams?: any[]): any {
    if (initParams) {
      return new injection.instanceCls(... initParams);
    } else {
      if (injection.initParams) {
        return new injection.instanceCls(... injection.initParams);
      } else {
        return new injection.instanceCls();
      }
    }
  }

}