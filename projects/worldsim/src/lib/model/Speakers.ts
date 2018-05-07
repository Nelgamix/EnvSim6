import {Receiver} from './Receiver';
import {Position} from './Position';

export class Speakers extends Receiver {
  private _volume: number;

  constructor(name: string, position: Position, volume: number) {
    super(name, position);
    this._volume = volume;
  }

  get volume(): number {
    return this._volume;
  }
}
