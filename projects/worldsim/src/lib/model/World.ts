import {Location} from './Location';
import {Obj} from './Obj';
import {Emitter} from './Emitter';
import {Receiver} from './Receiver';

export class World {
  private readonly _locations: Location[];
  private readonly _emmiters: Emitter[];
  private readonly _receivers: Receiver[];

  constructor() {
    this._locations = [];
    this._emmiters = [];
    this._receivers = [];
  }

  public addLocation(location: Location) {
    this._locations.push(location);
  }

  public addEmmiter(emmiter: Emitter) {
    this._emmiters.push(emmiter);
  }

  public addReceiver(receiver: Receiver) {
    this._receivers.push(receiver);
  }

  get locations(): Location[] {
    return this._locations;
  }

  get emmiters(): Emitter[] {
    return this._emmiters;
  }

  get receivers(): Receiver[] {
    return this._receivers;
  }
}
