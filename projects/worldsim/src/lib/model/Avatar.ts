export class Avatar {
  private _name: string;
  private _metadata: any;

  constructor(name: string, metadata: any) {
    this._name = name;
    this._metadata = metadata;
  }

  get name(): string {
    return this._name;
  }

  get metadata(): any {
    return this._metadata;
  }
}

export type JSONAvatar = {
  name: string;
};
