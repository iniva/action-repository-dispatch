class PayloadType {
  static STRING = 'string';
  static PATH = 'path';
  static URL = 'url';

  private constructor(private _type: string) {}

  static createFrom(type: string): PayloadType {
    const allowed = [this.STRING, this.PATH, this.URL];

    if (!allowed.includes(type)) {
      throw new Error(`[${type}] is an invalid payload type. Valid: ${allowed.join(', ')}`);
    }

    return new this(type);
  }

  isString(): boolean {
    return this._type === PayloadType.STRING;
  }

  isPath(): boolean {
    return this._type === PayloadType.PATH;
  }

  isURL(): boolean {
    return this._type === PayloadType.URL;
  }

  get type(): string {
    return this._type;
  }
}

export { PayloadType };
