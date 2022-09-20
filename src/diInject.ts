import {diMap} from "./utils/di/diMap";
import {diInject} from "./utils/di/diInject";

class BaseModel {
  message: string = "Hello from BaseModel";
}
diMap(BaseModel).asSingletone(); // register injection of BaseClass
//
console.log(diInject(BaseModel).message); // outputs "Hello from BaseModel";