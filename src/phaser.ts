import {dMap} from "./utils/di/dMap";
import {Gamble} from "./gamble/Gamble";
import {GambleView} from "./gamble/view/GambleView";
import {GambleController} from "./gamble/controller/GambleController";
import {GambleModel} from "./gamble/model/GambleModel";
import {dGet} from "./utils/di/dGet";
import {GambleSceneController} from "./gamble/controller/GambleSceneController";
import {BootSceneController} from "./gamble/controller/BootSceneController";
import {ResultSceneController} from "./gamble/controller/ResultSceneController";

dMap(GambleModel).asSingletone();
dMap(GambleView).asSingletone();
dMap(GambleController).asSingletone();
dMap(GambleSceneController).asSingletone();
dMap(BootSceneController).asSingletone();
dMap(GambleSceneController).asSingletone();
dMap(ResultSceneController).asSingletone();
dMap(Gamble).asSingletone();

dGet(Gamble);

