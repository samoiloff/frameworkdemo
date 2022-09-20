import {DiContextManager} from "./DiContextManager";

/**
 * Simplified Depencency Injection Pattern realization
 * method instantiates injection of specified class with specified parameters
 * and returns its instance
 *
 * if injection is defined as singletone, then returns instance of corresponding singletone
 *
 * @param cls - class to which injection is attached, used as id of injection
 * @param initData - parameters class constructor, required for instantiation
 * @param context - context of injection, required when you want to separate
 * injections in several contexts
 */

export const dInject = (cls: any, initData?: any[], context?: string): any => {
  return DiContextManager.inject(cls, initData, context);
};