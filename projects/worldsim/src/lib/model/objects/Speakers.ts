import {Position} from '../Position';
import {Obj} from '../Obj';
import {ChannelOrEmitterInitialDescription, InitialDescription, Update} from '../types';

export class Speakers extends Obj {
  public static readonly VOLUME_MIN = 0;
  public static readonly VOLUME_MAX = 1;

  private static readonly REGISTER_VOLUME = 'speakers_volume';

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

  register(e: InitialDescription) {
    const e1: ChannelOrEmitterInitialDescription = {
      id: this.completedId(Speakers.REGISTER_VOLUME),
      type: 'number',
      value: this.volume
    };

    e.channels.push(e1);
  }

  update(u: Update): boolean {
    if (u.id === this.completedId(Speakers.REGISTER_VOLUME)) {
      this.volume = u.value;
    } else {
      return false;
    }

    return true;
  }
}
