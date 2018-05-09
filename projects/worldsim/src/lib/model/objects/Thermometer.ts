import {Position} from '../Position';
import {Obj} from '../Obj';

export class Thermometer extends Obj {
  public static readonly TEMPERATURE_MIN = 10;
  public static readonly TEMPERATURE_MAX = 30;

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
      this.changed();
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
}
