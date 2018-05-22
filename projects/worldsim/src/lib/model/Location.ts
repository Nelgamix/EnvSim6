import {Avatar} from './Avatar';
import {Position} from './Position';

export class Location {
  private _name: string;
  private _width: number;
  private _height: number;
  private _metadata: any;
  private _position: Position;
  private _avatars: Avatar[];
  private _sublocations: Location[];

  constructor(
    name: string,
    width: number,
    height: number,
    position: Position,
    metadata: any,
    personnages: Avatar[],
    sublocations: Location[]
  ) {
    this._name = name;
    this._width = width;
    this._height = height;
    this._metadata = metadata;
    this._position = position;
    this._avatars = personnages;
    this._sublocations = sublocations;
  }

  get name(): string {
    return this._name;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get metadata(): any {
    return this._metadata;
  }

  get position(): Position {
    return this._position;
  }

  get avatars(): Avatar[] {
    return this._avatars;
  }

  get avatarsRec(): Avatar[] {
    let as = [];
    this._avatars.forEach(a => as.push(a));
    this._sublocations.forEach(l => as = as.concat(l.avatarsRec));
    return as;
  }

  get sublocations(): Location[] {
    return this._sublocations;
  }

  addAvatar(p: Avatar) {
    this._avatars.push(p);
    p.changeLocation(this);
  }

  addSublocation(sl: Location) {
    this._sublocations.push(sl);
  }

  removeAvatar(a: Avatar) {
    const io = this._avatars.indexOf(a);
    if (io < 0) {
      console.error('Avatar does not exists on this location.');
      return;
    }
    this._avatars.splice(io, 1);
  }
}
