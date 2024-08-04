"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayloadType = void 0;
class PayloadType {
    constructor(_type) {
        this._type = _type;
    }
    static createFrom(type) {
        const allowed = [this.STRING, this.PATH, this.URL];
        if (!allowed.includes(type)) {
            throw new Error(`[${type}] is an invalid payload type. Valid: ${allowed.join(', ')}`);
        }
        return new this(type);
    }
    isString() {
        return this._type === PayloadType.STRING;
    }
    isPath() {
        return this._type === PayloadType.PATH;
    }
    isURL() {
        return this._type === PayloadType.URL;
    }
    get type() {
        return this._type;
    }
}
exports.PayloadType = PayloadType;
PayloadType.STRING = 'string';
PayloadType.PATH = 'path';
PayloadType.URL = 'url';
