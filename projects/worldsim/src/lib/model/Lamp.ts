import {Position} from './Position';
import {Receiver} from './Receiver';

export class Lamp extends Receiver {
  private intensity: number;
  private color: string;

  constructor(name: string, position: Position, color: string, intensity: number) {
    super(name, position);
    this.color = color;
    this.intensity = intensity;
  }

  static isInstance(o): boolean {
    return o instanceof Lamp;
  }

  modifyIntensity(modifier: number): void {
    this.intensity += modifier;
    if (this.intensity < 0) this.intensity = 0;
    else if (this.intensity > 1) this.intensity = 1;
  }
}
