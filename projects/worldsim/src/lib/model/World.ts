import {Location} from './Location';
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
    this._scale = {x: 1, y: 1};
  }

  public addLocation(location: Location) {
    this._locations.push(location);
    location.avatarsRec.forEach(a => a.onChanged = (u: Update, t: UpdateType) => this.sendUpdate(u, t));
  }

  public addObject(object: Obj) {
    this._objects.push(object);
    object.onChanged = (u: Update, t: UpdateType) => this.sendUpdate(u, t);
  }

  public addObserver(f: (u: Update, t: UpdateType) => void): void {
    this._observers.push(f);
  }

  public clean(): void {
    this._objects.splice(0, this._objects.length);
    this._locations.splice(0, this._locations.length);
    this._scale = {x: 1, y: 1};
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

  get locations(): Location[] {
    return this._locations;
  }

  get objects(): Obj[] {
    return this._objects;
  }

  get scale(): { x: number; y: number } {
    return this._scale;
  }

  get avatars(): Avatar[] {
    const avatars = [];
    this._locations.forEach(l => l.avatarsRec.forEach(a => avatars.push(a)));
    console.log(avatars);
    return avatars;
  }

  set scale(scale: {x: number, y: number}) {
    this._scale = scale;
  }
}
