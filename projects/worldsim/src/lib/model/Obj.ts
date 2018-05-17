import {Position} from './Position';
import {InitialDescription, Update, UpdateType} from './types';

export class Obj {
  private static readonly REGISTER_SEPARATOR = '::';

  private _name: string;
  private _position: Position;
  private _onChanged: (u: Update, t: UpdateType) => void;

  constructor(name: string, position: Position) {
    this._name = name;
    this._position = position;
  }

  static getObjName(id: string): string {
    return id.split(this.REGISTER_SEPARATOR)[0];
  }

  get name(): string {
    return this._name;
  }

  get position(): Position {
    return this._position;
  }

  set onChanged(value: (u: Update, t: UpdateType) => void) {
    this._onChanged = value;
  }

  register(e: InitialDescription) {
  }

  update(u: Update): boolean {
    return false;
  }

  protected sendUpdate(u: Update, t: UpdateType): void {
    this._onChanged(u, t);
  }

  protected completedId(s: string): string {
    return this.name + Obj.REGISTER_SEPARATOR + s;
  }
}
