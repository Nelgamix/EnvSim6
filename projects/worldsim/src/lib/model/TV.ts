import {Receiver} from './Receiver';
import {Position} from './Position';

export class TV extends Receiver {
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

  modifyVolume(modifier: number): void {
    this._volume += modifier;
    if (this._volume < 0) this._volume = 0;
    else if (this._volume > 1) this._volume = 1;
  }
}
