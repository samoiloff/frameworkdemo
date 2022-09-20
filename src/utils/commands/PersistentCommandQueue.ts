import {CommandBase} from "./CommandBase";
import {CommandResolveBase} from "./CommandResolveBase";
import {IResolveFunction} from "../definitions";

/**
 * The Chain Of Responsibility pattern realization.
 * https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern
 * Doesn't remove command from the queue on command completion
 */
export class PersistentCommandQueue extends CommandBase {

  protected commands: CommandResolveBase[] = [];
  protected resolveFunction: IResolveFunction;

  protected currentCommandIndex: number = -1;

  add(command: CommandResolveBase): void {
    this.commands.push(command);
  }

  run(): Promise<any> {
    if (this.currentCommandIndex !== -1) {
      throw new Error('Already running');
    }

    return new Promise((resolve) => {
      this.resolveFunction = resolve;
      this.runNextCommand();
    });
  }

  runFromCommand(command: CommandResolveBase): Promise<any> {
    const commandIndex: number = this.commands.indexOf(command);
    if (commandIndex < 0) {
      throw new Error("Command not found : " + command);
    }
    this.currentCommandIndex = commandIndex - 1;
    return new Promise((resolve) => {
      this.resolveFunction = resolve;
      this.runNextCommand();
    });
  }

  get isRunning(): boolean {
    return this.currentCommandIndex >= 0;
  }

  reset(): void {
    this.commands.forEach((command) => {
      command.reset();
    });
    this.currentCommandIndex = -1;
    this.resolveFunction = null;
  }

  destroy() {
    if (this.commands) {
      this.commands.forEach((command: CommandBase) => {
        command.destroy();
      });
      this.commands = null;
      this.resolveFunction = null;
    }
    super.destroy();
  }

  protected runNextCommand(): void {
    this.currentCommandIndex++;
    if (this.currentCommandIndex < this.commands.length) {
      const command: CommandBase = this.commands[this.currentCommandIndex];
      command.run().then(() => {
        this.runNextCommand();
      });
    } else {
      this.readyToResolve();
    }
  }

  protected readyToResolve(): void {
    const resolve: IResolveFunction = this.resolveFunction;
    this.resolveFunction = null;
    this.currentCommandIndex = -1;

    resolve();
  }
}