import {Emitter} from '../Emitter';
import {Position} from '../Position';

export class LightSensor extends Emitter {
  public static readonly LIGHT_MIN = 0;
  public static readonly LIGHT_MAX = 1;

  private _light: number;

  constructor(name: string, position: Position, light: number) {
    super(name, position);
    this._light = light;
  }

  static isInstance(o): boolean {
    return o instanceof LightSensor;
  }

  get light(): number {
    return this._light;
  }

  set light(value: number) {
    const ll = this._light;
    this._light = Math.max(LightSensor.LIGHT_MIN, Math.min(value, LightSensor.LIGHT_MAX));
    if (ll !== this._light) {
      this.changed();
    }
  }

  modifyLight(modifier: number): void {
    if (modifier === 0) return;
    this.light += modifier;
  }
}
