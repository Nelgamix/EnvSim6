import {Position} from './Position';

export class Obj {
  private _name: string;
  private _position: Position;
  private _data: any;

  constructor(name: string, position: Position, data: any) {
    this._name = name;
    this._position = position;
    this._data = data;
  }

  get name(): string {
    return this._name;
  }

  get position(): Position {
    return this._position;
  }

  get data(): any {
    return this._data;
  }
}
