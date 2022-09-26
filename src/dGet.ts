import {dMap} from "./utils/di/dMap";
import {dGet} from "./utils/di/dGet";

class BaseModel {
  message: string = "Hello from BaseModel";
}
dMap(BaseModel).asSingletone(); // register injection of BaseClass
//
console.log(dGet(BaseModel).message); // outputs "Hello from BaseModel";