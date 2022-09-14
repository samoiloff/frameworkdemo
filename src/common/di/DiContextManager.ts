import {DiContext} from "./DiContext";
import {IContexts, InjectionData} from "./definitions";

/**
 * Depencency Injections Context Manager
 */
export class DiContextManager {

  static DEFAULT = "default";

  static contexts: IContexts = new Map<string, DiContext>();

  static getContext(contextId?: string): DiContext {
    if (!contextId) {
      contextId = DiContextManager.DEFAULT;
    }

    let context: DiContext = DiContextManager.contexts[contextId];
    if (!context) {
      context = new DiContext()
      DiContextManager.contexts[contextId] = context;
    }
    return context;
  }

  static inject(cls: any, initData?: any[], contextId?: string): any {
    return DiContextManager.getContext(contextId).instantiate(cls, initData);
  }

  static map(cls: any, contextId: string = null): InjectionData {
    const context: DiContext = DiContextManager.getContext(contextId)
    let injection: InjectionData = context.data[cls.name];
    if (!injection) {
      injection = new InjectionData();
      injection.keyCls = cls;
      injection.instanceCls = cls;
      context.data[cls.name] = injection;
    }
    return injection;
  }
}