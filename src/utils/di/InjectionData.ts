import Logger from "../Logger";

/**
 * The injection piece of data. Stores data of single injection.
 */
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

  toInstance(value: any): InjectionData {
    this.isSingletone = true;

    this.instance = value;
    Logger.mapObjectToGlobalId(this.instance, "d");
    return this;
  }

}