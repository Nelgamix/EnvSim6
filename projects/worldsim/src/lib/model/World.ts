import {JSONLocation, Location} from './Location';
import {Obj} from './Obj';
import {Update, UpdateType} from './types';
import {Avatar} from './Avatar';

export class World {
  public static readonly REGISTER_SEPARATOR = '::';

  private readonly _locations: Location[];
  private readonly _objects: Obj[];
  private _scale: {x: number, y: number};

  private readonly _observers: ((u: Update, t: UpdateType) => void)[];

  constructor() {
    this._locations = [];
    this._objects = [];
    this._observers = [];
  }

  public addLocation(location: Location) {
    this._locations.push(location);
    location.avatars.forEach(a => a.onChanged = (u: Update, t: UpdateType) => this.sendUpdate(u, t));
  }

  public addObject(object: Obj) {
    this._objects.push(object);
    object.onChanged = (u: Update, t: UpdateType) => this.sendUpdate(u, t);
  }

  public addObserver(f: (u: Update, t: UpdateType) => void): void {
    this._observers.push(f);
  }

  get locations(): Location[] {
    return this._locations;
  }

  get objects(): Obj[] {
    return this._objects;
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

  sendUpdate(u: Update, t: UpdateType): void {
    this._observers.forEach(o => o(u, t));
  }

  set scale(scale: {x: number, y: number}) {
    this._scale = scale;
  }

  get scale(): { x: number; y: number } {
    return this._scale;
  }

  get avatars(): Avatar[] {
    const avatars = [];
    this._locations.forEach(l => l.avatars.forEach(a => avatars.push(a)));
    return avatars;
  }
}

export type JSONWorld = {
  name: string;
  scale?: {x: number, y: number};
  objects: any[]; // preciser?
  locations: JSONLocation[];
};
