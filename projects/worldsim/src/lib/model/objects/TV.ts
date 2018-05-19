import {Position} from '../Position';
import {Obj} from '../Obj';
import {ChannelOrEmitterInitialDescription, InitialDescription, Update} from '../types';

export class TV extends Obj {
  public static readonly VOLUME_MIN = 0;
  public static readonly VOLUME_MAX = 1;

  public static readonly CHANNEL_MIN = 0;
  public static readonly CHANNEL_MAX = 18;

  private static readonly REGISTER_CHANNEL = 'tv_channel';
  private static readonly REGISTER_VOLUME = 'tv_volume';

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

  static constructFrom(o: any): TV | null {
    const name = o.name;
    const position = Position.constructFrom(o.position);
    const channel = o.channel;
    const volume = o.volume;

    if (name === null || position === null || channel === null || volume === null) {
      return null;
    }

    return new TV(name, position, channel, volume);
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

  register(e: InitialDescription) {
    const e1: ChannelOrEmitterInitialDescription = {
      id: this.completedId(TV.REGISTER_CHANNEL),
      type: 'number',
      value: this.channel
    };
    const e2: ChannelOrEmitterInitialDescription = {
      id: this.completedId(TV.REGISTER_VOLUME),
      type: 'string',
      value: this.volume
    };

    e.channels.push(e1);
    e.channels.push(e2);
  }

  update(u: Update): boolean {
    if (u.id === this.completedId(TV.REGISTER_VOLUME)) {
      this.volume = u.value;
    } else if (u.id === this.completedId(TV.REGISTER_CHANNEL)) {
      this.channel = u.value;
    } else {
      return false;
    }

    return true;
  }
}
