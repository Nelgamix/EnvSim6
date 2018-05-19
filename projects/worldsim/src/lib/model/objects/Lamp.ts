import {Position} from '../Position';
import {Obj} from '../Obj';
import {ChannelOrEmitterInitialDescription, InitialDescription, Update} from '../types';

export class Lamp extends Obj {
  public static readonly INTENSITY_MIN = 0;
  public static readonly INTENSITY_MAX = 1;

  private static readonly REGISTER_COLOR = 'lamp_color';
  private static readonly REGISTER_INTENSITY = 'lamp_intensity';

  private _intensity: number;
  private _color: string;

  constructor(name: string, position: Position, color: string, intensity: number) {
    super(name, position);
    this._color = color;
    this._intensity = intensity;
  }

  static isInstance(o): boolean {
    return o instanceof Lamp;
  }

  static constructFrom(o: any): Lamp | null {
    const name = o.name;
    const position = Position.constructFrom(o.position);
    const color = o.color;
    const intensity = o.intensity;

    if (name === null || position === null || color === null || intensity === null) {
      return null;
    }

    return new Lamp(name, position, color, intensity);
  }

  get intensity(): number {
    return this._intensity;
  }

  get color(): string {
    return this._color;
  }

  set intensity(value: number) {
    this._intensity = Math.max(Lamp.INTENSITY_MIN, Math.min(value, Lamp.INTENSITY_MAX));
  }

  set color(value: string) {
    this._color = value;
  }

  modifyIntensity(modifier: number): void {
    this.intensity += modifier;
  }

  register(e: InitialDescription) {
    const e1: ChannelOrEmitterInitialDescription = {
      id: this.completedId(Lamp.REGISTER_INTENSITY),
      type: 'number',
      value: this.intensity
    };
    const e2: ChannelOrEmitterInitialDescription = {
      id: this.completedId(Lamp.REGISTER_COLOR),
      type: 'string',
      value: this.color
    };

    e.channels.push(e1);
    e.channels.push(e2);
  }

  update(u: Update): boolean {
    if (u.id === this.completedId(Lamp.REGISTER_COLOR)) {
      this.intensity = u.value;
    } else if (u.id === this.completedId(Lamp.REGISTER_INTENSITY)) {
      this.color = u.value;
    } else {
      return false;
    }

    return true;
  }
}
