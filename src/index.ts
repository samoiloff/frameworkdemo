import {CounterModel} from "./counter/CounterModel";
import {CounterView} from "./counter/CounterView";
import {CounterController} from "./counter/controllers/CounterController";
import {Counter} from "./counter/Counter";
import {dMap} from "./utils/di/dMap";
import {dInject} from "./utils/di/dInject";
import {CounterTimerController} from "./counter/controllers/CounterTimerController";
import {CounterLabelController} from "./counter/controllers/CounterLabelController";

/**
 * map model, view, controller and component as singletones,
 * but in this case singletones are not necessary, just demonstation
 */
function mapInjections(): void {
  dMap(CounterModel).asSingletone();
  dMap(CounterView).asSingletone();
  dMap(CounterController).asSingletone();
  dMap(CounterTimerController).asSingletone();
  dMap(CounterLabelController).asSingletone();
  dMap(Counter).asSingletone();
}

/**
 * instantiation of Counter component
 */
function createCounter(): Counter {
  return dInject(Counter);
}

mapInjections();
createCounter();
