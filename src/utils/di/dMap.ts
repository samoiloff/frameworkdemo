import {DiContextManager} from "./DiContextManager";
import {InjectionData} from "./InjectionData";

/**
 * Simplified Depencency Injection Pattern Realization
 * Method creates injection record and returns link to injection data.
 * Required for override.
 * Let's say you have core injection class A. And B extends A, then override
 * looks like following:
 *
 * dMap(A); // in core module
 *
 * dMap(A).toClass(B); // in game module
 *
 * dInject(A) // returns instance of B
 *
 * Then class B will be instantiated instead of A in all dInject() calls
 *
 * @param cls - class to which injection is attached, used as id of injection
 * @param context - context of injection, required when you want to separate
 * injections in several contexts
 */
export const dMap = (cls: any, context: string = null): InjectionData => {
  return DiContextManager.map(cls, context);
}