import {dMap} from "./utils/di/dMap";
import {dInject} from "./utils/di/dInject";

class BaseModel {
  message: string = "Hello from BaseModel";
}
dMap(BaseModel).asSingletone(); // register injection of BaseClass
//
console.log(dInject(BaseModel).message); // outputs "Hello from BaseModel";