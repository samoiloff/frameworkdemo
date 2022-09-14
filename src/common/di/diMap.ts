import {DiContextManager} from "./DiContextManager";
import {InjectionData} from "./definitions";

/**
 * Simplified Depencency Injection Pattern Realization
 * Method creates injection record and returns link to injection data.
 * Required for override.
 * Let's say you have core injection class A. And B extends A, then override
 * looks like following:
 *
 * diMap(A); // in core module
 *
 * diMap(A).toClass(B); // in game module
 *
 * diInject(A) // returns instance of B
 *
 * Then class B will be instantiated instead of A in all diInject() calls
 *
 * @param cls - class to which injection is attached, used as id of injection
 * @param context - context of injection, required when you want to separate
 * injections in several contexts
 */
export default (cls: any, context: string = null): InjectionData => {
  return DiContextManager.map(cls, context);
}