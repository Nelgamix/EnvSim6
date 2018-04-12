import {Obj} from './Obj';
import {Position} from './Position';

export class Lamp extends Obj {
  private _state: string;

  constructor(name: string, position: Position, state: string) {
    super(name, position);
    this._state = state;
  }

  get state(): string {
    return this._state;
  }
}
