// in core library
import {diInject} from "./utils/di/diInject";
import {diMap} from "./utils/di/diMap";

class BaseModel {
  message: string = "Hello from Base Model";
}
diMap(BaseModel).asSingletone(); // register injection of BaseClass
// in game code
class GameModel extends BaseModel {
  message: string = "Hello from Game Model"
}
diMap(BaseModel).toClass(GameModel); // map injection to child class
//
console.log(diInject(BaseModel).message); // outputs "Hello from Game Model";
// all instantiations via diInject(BaseModel) will return GameModel