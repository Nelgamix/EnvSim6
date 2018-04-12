import {Location} from './Location';
import {Obj} from './Obj';

export class World {
  private readonly _locations: Location[];
  private readonly _objects: Obj[];

  constructor() {
    this._locations = [];
    this._objects = [];
  }

  public addLocation(location: Location) {
    this._locations.push(location);
  }

  public addObject(object: Obj) {
    this._objects.push(object);
  }

  get locations(): Location[] {
    return this._locations;
  }

  get objects(): Obj[] {
    return this._objects;
  }
}
