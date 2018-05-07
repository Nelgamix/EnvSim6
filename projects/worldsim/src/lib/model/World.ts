import {Location} from './Location';
import {Emitter} from './Emitter';
import {Receiver} from './Receiver';

export class World {
  private readonly _locations: Location[];
  private readonly _emitters: Emitter[];
  private readonly _receivers: Receiver[];

  constructor() {
    this._locations = [];
    this._emitters = [];
    this._receivers = [];
  }

  public addLocation(location: Location) {
    this._locations.push(location);
  }

  public addEmmiter(emmiter: Emitter) {
    this._emitters.push(emmiter);
  }

  public addReceiver(receiver: Receiver) {
    this._receivers.push(receiver);
  }

  get locations(): Location[] {
    return this._locations;
  }

  get emitters(): Emitter[] {
    return this._emitters;
  }

  get receivers(): Receiver[] {
    return this._receivers;
  }

  calculateHeight(): number {
    let h = 0;
    for (const l of this.locations) {
      if (h < l.height + l.position.y) {
        h = l.height + l.position.y;
      }
    }

    return h;
  }

  calculateWidth(): number {
    let w = 0;
    for (const l of this.locations) {
      if (w < l.width + l.position.x) {
        w = l.width + l.position.x;
      }
    }

    return w;
  }
}
