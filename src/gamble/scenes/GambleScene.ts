import {MvcScene} from "../../Scenes/MvcScene";
import {GambleSceneController} from "../controller/GambleSceneController";
import {dGet} from "../../utils/di/dGet";
import {SceneKey} from "./SceneKey";
import {GambleView} from "../view/GambleView";
import {GambleModel} from "../model/GambleModel";
import {GambleEvent} from "../events/GambleEvent";
import Phaser from "phaser";
import {TextUtils} from "../utils/TextUtils";

export class GambleScene extends MvcScene {

  protected view: GambleView = dGet(GambleView);
  protected model: GambleModel = dGet(GambleModel);

  protected balanceText: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: SceneKey.GAMBLE_SCENE,
    });

    this.addController(dGet(GambleSceneController, [this]));
  }

  create() {
    this.balanceText = this.add.text(300, 150, "");

    this.add.text(340, 200, "Pick Color");

    const redSprite: any = this.add.sprite(230, 300, 'red').setInteractive();
    const blackSprite: any = this.add.sprite(530, 300, 'black').setInteractive();

    redSprite.on('pointerdown', (pointer) => {
      redSprite.setTint(0xff0000);

    });

    redSprite.on('pointerout', (pointer) => {
      redSprite.clearTint();
    });

    redSprite.on('pointerup', (pointer) => {
      redSprite.clearTint();
      this.model.dispatch(GambleEvent.RED_CLICK);
    });

    blackSprite.on('pointerdown', (pointer) => {
      blackSprite.setTint(0xff0000);
    });

    blackSprite.on('pointerout', (pointer) => {
      blackSprite.clearTint();
    });

    blackSprite.on('pointerup', (pointer) => {
      blackSprite.clearTint();
      this.model.dispatch(GambleEvent.BLACK_CLICK);
    });

    this.events.on('wake', () => {
      this.updateText();
    });
    this.updateText();
  }

  updateText(): void {
    this.balanceText.text = TextUtils.getBalanceText(this.model.balance);
  }
}