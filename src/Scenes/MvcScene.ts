import {SceneControllerBase} from "./controllers/SceneControllerBase";

/**
 * Model-View-Controller (MVC) pattern realization for Phaser.Scene
 * read more here:
 * https://stefanoborini.com/book-modelviewcontroller/02-mvc-variations/05-variations-on-the-triad/01-model-view-adapter.html
 */
export class MvcScene extends Phaser.Scene {

  created: boolean;

  protected controllers: SceneControllerBase[] = [];

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  /**
   * Scene can have set of controllers. Controllers are advised be decomposed according to the
   * SOLID "single responsibility principle", read more here:
   * https://en.wikipedia.org/wiki/SOLID
   * @param controller - the scene controller instance
   */
  addController(controller: SceneControllerBase): void {
    this.controllers.push(controller);
    controller.initialize();
  }

  /**
   * The function is overriden to avoid memory leak. Each call of scene.launch() leads to call of scene.create()
   * Thus in case when there's no "created" check, the scene children will be created again.
   * @param communicator
   */
  create() {
    if (!this.created) {
      this.createChildren();
      this.created = true;
    }
  }

  /**
   * add children to the scene in this method if you use scene.sleep() - scene.launch() calls combination
   * to avoid the memory leak
   */
  protected createChildren(): void {

  }

}