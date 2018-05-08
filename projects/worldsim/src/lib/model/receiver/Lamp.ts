import {Position} from '../Position';
import {Receiver} from '../Receiver';

export class Lamp extends Receiver {
  public static readonly INTENSITY_MIN = 0;
  public static readonly INTENSITY_MAX = 1;

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
}
