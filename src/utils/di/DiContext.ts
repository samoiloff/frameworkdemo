import Logger from "../Logger";
import {IContextData} from "../definitions";
import {InjectionData} from "./InjectionData";

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
    let params: any[];
    if (initParams) {
      params = initParams;
    } else {
      if (injection.initParams) {
        params = injection.initParams;
      }
    }

    let instance: any;
    if (params) {
      instance = new injection.instanceCls(... params);
    } else {
      instance = new injection.instanceCls();
    }

    Logger.mapObjectToGlobalId(instance, "d");

    return instance;
  }

}