import {Location} from './Location';
import {Emitter} from './Emitter';
import {Receiver} from './Receiver';

export class World {
  private readonly _locations: Location[];
  private readonly _emitters: Emitter[];
  private readonly _receivers: Receiver[];

  private readonly _observers: ((any) => void)[];

  constructor() {
    this._locations = [];
    this._emitters = [];
    this._receivers = [];
    this._observers = [];
  }

  public addLocation(location: Location) {
    this._locations.push(location);
  }

  public addEmmiter(emitter: Emitter) {
    this._emitters.push(emitter);
    emitter.onChanged = (e: Emitter) => this.emitterChanged(e);
  }

  public addReceiver(receiver: Receiver) {
    this._receivers.push(receiver);
  }

  public addObserver(f: (any: any) => void): void {
    this._observers.push(f);
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

  emitterChanged(e: Emitter): void {
    for (const f of this._observers) {
      f(e);
    }
  }
}
