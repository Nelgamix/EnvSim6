import {Obj} from './Obj';

export class Emitter extends Obj {
  private _onChanged: (e: Emitter) => void;

  set onChanged(value: (e: Emitter) => void) {
    this._onChanged = value;
  }

  protected changed(): void {
    this._onChanged(this);
  }
}
