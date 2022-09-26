// in core library
import {dGet} from "./utils/di/dGet";
import {dMap} from "./utils/di/dMap";

class BaseModel {
  message: string = "Hello from Base Model";
}
dMap(BaseModel).asSingletone(); // register injection of BaseClass
// in game code
class GameModel extends BaseModel {
  message: string = "Hello from Game Model"
}
dMap(BaseModel).toClass(GameModel); // map injection to child class
//
console.log(dGet(BaseModel).message); // outputs "Hello from Game Model";
// all instantiations via dGet(BaseModel) will return GameModel