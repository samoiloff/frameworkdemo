import {MvcScene} from "../../Scenes/MvcScene";
import {SceneKey} from "./SceneKey";
import {dInject} from "../../utils/di/dInject";
import {GambleEvent} from "../events/GambleEvent";
import {GambleView} from "../view/GambleView";
import {GambleModel} from "../model/GambleModel";
import Phaser from "phaser";
import {ResultSceneController} from "../controller/ResultSceneController";
import {TextUtils} from "../utils/TextUtils";

export class ResultScene extends MvcScene {

  protected text: Phaser.GameObjects.Text;
  protected balanceText: Phaser.GameObjects.Text;

  protected view: GambleView = dInject(GambleView);
  protected model: GambleModel = dInject(GambleModel);

  constructor() {
    super({
      key: SceneKey.RESULT_SCENE
    });
    this.addController(dInject(ResultSceneController, [this]));
  }

  create() {
    const btn: any = this.add.sprite(400, 400, 'btn').setInteractive();
    this.add.text(390, 390, "OK");

    this.text = this.add.text(360, 200, "");
    this.balanceText = this.add.text(300, 150, "");

    btn.on('pointerdown', (pointer) => {
      btn.setTint(0xff0000);
    });

    btn.on('pointerout', (pointer) => {
      btn.clearTint();
    });

    btn.on('pointerup', (pointer) => {
      btn.clearTint();
      this.model.dispatch(GambleEvent.RESULT_OK);
    });

    this.events.on('wake', () => {
      this.updateText();
    });
    this.updateText();
  }

  private updateText(): void {
    this.text.text = TextUtils.getResultText(this.model.isWin);
    this.balanceText.text = TextUtils.getBalanceText(this.model.balance);
  }

}