import {Position} from './Position';

export class Obj {
  private _name: string;
  private _position: Position;
  private _onChanged: (o: Obj) => void;

  constructor(name: string, position: Position) {
    this._name = name;
    this._position = position;
  }

  get name(): string {
    return this._name;
  }

  get position(): Position {
    return this._position;
  }

  set onChanged(value: (o: Obj) => void) {
    this._onChanged = value;
  }

  protected changed(): void {
    this._onChanged(this);
  }
}
