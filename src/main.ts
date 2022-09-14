import diMap from "./common/di/diMap";
import {CounterModel} from "./counter/CounterModel";
import {CounterView} from "./counter/CounterView";
import {CounterController} from "./counter/controllers/CounterController";
import {Counter} from "./counter/Counter";
import diInject from "./common/di/diInject";

/**
 * map model, view, controller and component as singletones,
 * but in this case singletones are not necessary, just demonstation
 */
function mapInjections(): void {
  diMap(CounterModel).asSingletone();
  diMap(CounterView).asSingletone();
  diMap(CounterController).asSingletone();
  diMap(Counter).asSingletone();
}

/**
 * instantiation of Counter component
 */
function createCounter(): Counter {
  return diInject(Counter);
}

mapInjections();
createCounter();
