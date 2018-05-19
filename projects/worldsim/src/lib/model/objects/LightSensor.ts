import {Position} from '../Position';
import {Obj} from '../Obj';
import {ChannelOrEmitterInitialDescription, InitialDescription, UpdateType} from '../types';

export class LightSensor extends Obj {
  public static readonly LIGHT_MIN = 0;
  public static readonly LIGHT_MAX = 1;

  private static readonly REGISTER_LIGHT = 'lightsensor_light';

  private _light: number;

  constructor(name: string, position: Position, light: number) {
    super(name, position);
    this._light = light;
  }

  static isInstance(o): boolean {
    return o instanceof LightSensor;
  }

  static constructFrom(o: any): LightSensor | null {
    const name = o.name;
    const position = Position.constructFrom(o.position);
    const light = o.light;

    if (name === null || position === null || light === null) {
      return null;
    }

    return new LightSensor(name, position, light);
  }

  get light(): number {
    return this._light;
  }

  set light(value: number) {
    const ll = this._light;
    this._light = Math.max(LightSensor.LIGHT_MIN, Math.min(value, LightSensor.LIGHT_MAX));
    if (ll !== this._light) {
      const u = {id: this.completedId(LightSensor.REGISTER_LIGHT), value: this._light};
      this.sendUpdate(u, UpdateType.EMITTER);
    }
  }

  modifyLight(modifier: number): void {
    if (modifier === 0) {
      return;
    }
    this.light += modifier;
  }

  register(e: InitialDescription) {
    const e1: ChannelOrEmitterInitialDescription = {
      id: this.completedId(LightSensor.REGISTER_LIGHT),
      type: 'number',
      value: this.light
    };

    e.emitters.push(e1);
  }
}
