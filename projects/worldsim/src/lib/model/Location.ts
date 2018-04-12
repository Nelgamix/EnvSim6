import {Personnage} from './Personnage';
import {Position} from './Position';

export class Location {
  private _name: string;
  private _width: number;
  private _height: number;
  private _metadata: any;
  private _position: Position;
  private _personnages: Personnage[];
  private _sublocations: Location[];

  constructor(name: string, width: number, height: number, metadata: any, position: Position, personnages: Personnage[], sublocations: Location[]) {
    this._name = name;
    this._width = width;
    this._height = height;
    this._metadata = metadata;
    this._position = position;
    this._personnages = personnages;
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

  get personnages(): Personnage[] {
    return this._personnages;
  }

  get sublocations(): Location[] {
    return this._sublocations;
  }
}
