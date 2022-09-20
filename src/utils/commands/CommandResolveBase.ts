import {CommandBase} from "./CommandBase";
import {IResolveFunction} from "../definitions";

/**
 * Asynchronous Command. Created for PersistentCommandQueue or SingleRunCommandQueue.
 * internalRun() shall be overriden, the command logic shall be added to this method.
 * internalResolve() shall be called in the end of command execution .
 */
export abstract class CommandResolveBase extends CommandBase {

  protected resolve: IResolveFunction;

  run(): Promise<any> {
    if (this.resolve) {
      throw  new Error('Already in progress');
    }
    return new Promise<any>((resolve) => {
      this.resolve = resolve;
      this.internalRun();
    });
  }

  reset(): void {
    this.resolve = null;
    this.internalResolve();
  }

  protected abstract internalRun(): void;

  protected internalResolve(): void {
    const resolve = this.resolve;
    this.resolve = null;
    if (resolve) {
      resolve();
    }
  }



}
