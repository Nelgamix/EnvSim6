import {Location} from './Location';
import {ChannelOrEmitterInitialDescription, InitialDescription, Update, UpdateType} from './types';
import {World} from './World';

export class Avatar {
  private _name: string;
  private _location: string;
  private _metadata: any;

  private _onChanged: (u: Update, t: UpdateType) => void;

  constructor(name: string, location: string, metadata: any) {
    this._name = name;
    this._location = location;
    this._metadata = metadata;
  }

  get name(): string {
    return this._name;
  }

  get location(): string {
    return this._location;
  }

  get metadata(): any {
    return this._metadata;
  }

  get locationRegisterId() {
    return 'Avatar' + World.REGISTER_SEPARATOR + this.name + World.REGISTER_SEPARATOR + 'location';
  }

  set location(value: string) {
    this._location = value;
  }

  set onChanged(value: (u: Update, t: UpdateType) => void) {
    this._onChanged = value;
  }

  changeLocation(newLocation: Location): void {
    if (newLocation.sublocations.length > 0) return;

    this.location = newLocation.name;
    this.sendUpdate();
  }

  register(e: InitialDescription) {
    const e1: ChannelOrEmitterInitialDescription = {
      id: this.locationRegisterId,
      type: 'string',
      value: this.location
    };

    e.emitters.push(e1);
  }

  sendUpdate(): void {
    const u = {id: this.locationRegisterId, value: this._location};
    this._onChanged(u, UpdateType.EMITTER);
  }
}

export type JSONAvatar = {
  name: string;
};
