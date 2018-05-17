import {Position} from '../Position';
import {Obj} from '../Obj';
import {ChannelOrEmitterInitialDescription, InitialDescription, UpdateType} from '../types';

export class Thermometer extends Obj {
  public static readonly TEMPERATURE_MIN = 10;
  public static readonly TEMPERATURE_MAX = 30;

  private static readonly REGISTER_TEMPERATURE = 'thermometer_temperature';

  private _temperature: number;

  constructor(name: string, position: Position, temperature: number) {
    super(name, position);
    this._temperature = temperature;
  }

  static isInstance(o): boolean {
    return o instanceof Thermometer;
  }

  set temperature(value: number) {
    const lt = this._temperature;
    this._temperature = Math.max(Thermometer.TEMPERATURE_MIN, Math.min(value, Thermometer.TEMPERATURE_MAX));
    if (lt !== this._temperature) {
      const u = {id: this.completedId(Thermometer.REGISTER_TEMPERATURE), value: this._temperature};
      this.sendUpdate(u, UpdateType.EMITTER);
    }
  }

  get temperature(): number {
    return this._temperature;
  }

  modifyTemperature(modifier: number): void {
    if (modifier === 0) {
      return;
    }
    this.temperature += modifier;
  }

  register(e: InitialDescription) {
    const e1: ChannelOrEmitterInitialDescription = {
      id: this.completedId(Thermometer.REGISTER_TEMPERATURE),
      type: 'number',
      value: this.temperature
    };

    e.emitters.push(e1);
  }
}
