export class Position {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  static constructFrom(o: any): Position | null {
    const x = o.x;
    const y = o.y;

    if (x === null || y === null) {
      return null;
    }

    return new Position(x, y);
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }
}
