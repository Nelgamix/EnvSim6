import {Receiver} from '../Receiver';
import {Position} from '../Position';

export class Speakers extends Receiver {
  public static readonly VOLUME_MIN = 0;
  public static readonly VOLUME_MAX = 1;

  private _volume: number;

  constructor(name: string, position: Position, volume: number) {
    super(name, position);
    this._volume = volume;
  }

  get volume(): number {
    return this._volume;
  }

  set volume(value: number) {
    this._volume = Math.max(Speakers.VOLUME_MIN, Math.min(value, Speakers.VOLUME_MAX));
  }
}
