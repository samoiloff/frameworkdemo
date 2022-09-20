/**
 * Base Command class
 */

export abstract class CommandBase {

  run(): Promise<any> {
    return Promise.resolve();
  }

  destroy() {

  }

}
