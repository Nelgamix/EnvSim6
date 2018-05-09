import {Position} from '../Position';
import {Obj} from '../Obj';

export class TV extends Obj {
  public static readonly VOLUME_MIN = 0;
  public static readonly VOLUME_MAX = 1;

  public static readonly CHANNEL_MIN = 0;
  public static readonly CHANNEL_MAX = 18;

  private _channel: number;
  private _volume: number;

  constructor(name: string, position: Position, channel: number, volume: number) {
    super(name, position);
    this._channel = channel;
    this._volume = volume;
  }

  static isInstance(o): boolean {
    return o instanceof TV;
  }

  get channel(): number {
    return this._channel;
  }

  get volume(): number {
    return this._volume;
  }

  set channel(value: number) {
    this._channel = Math.max(TV.CHANNEL_MIN, Math.min(value, TV.CHANNEL_MAX));
  }

  set volume(value: number) {
    this._volume = Math.max(TV.VOLUME_MIN, Math.min(value, TV.VOLUME_MAX));
  }

  modifyVolume(modifier: number): void {
    this.volume += modifier;
  }
}
