import Phaser from "phaser";

export abstract class SceneControllerBase {

  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  abstract initialize(): void;

  destroy(): void {
    this.scene = null;
  }

}