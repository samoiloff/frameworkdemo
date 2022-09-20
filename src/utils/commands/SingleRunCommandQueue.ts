import {CommandBase} from "./CommandBase";
import {IResolveFunction} from "../definitions";

/**
 * The Chain Of Responsibility pattern realization.
 * https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern
 * Removes command from the queue on command completion
 */
export class SingleRunCommandQueue extends CommandBase {

  private _commands: CommandBase[] = [];
  private _running: boolean;
  private _resolve: IResolveFunction;

  constructor() {
    super();
  }

  add(command: CommandBase): void {
    this._commands.push(command);
  }

  run(): Promise<any> {
    if (this._running) {
      throw new Error('Already running');
    }

    return new Promise((resolve) => {
      this._running = true;
      this._resolve = resolve;

      this.runNextCommand();
    });
  }

  get running(): boolean {
    return this._running;
  }

  destroy() {
    if (this._commands) {
      this._commands.forEach((command: CommandBase) => {
        command.destroy();
      });
      this._commands = null;
      this._resolve = null;
      this._running = false;
    }
    super.destroy();
  }

  private runNextCommand(): void {
    if (this._commands.length > 0) {
      const command: CommandBase = this._commands.shift();
      command.run().then(() => {
        command.destroy();
        this.runNextCommand();
      });
    } else {
      this.readyToResolve();
    }
  }

  private readyToResolve(): void {
    const resolve: IResolveFunction = this._resolve;
    this._resolve = null;
    this._running = false;

    resolve();
  }

}