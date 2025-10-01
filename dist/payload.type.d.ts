declare class PayloadType {
    private _type;
    static STRING: string;
    static PATH: string;
    static URL: string;
    private constructor();
    static createFrom(type: string): PayloadType;
    isString(): boolean;
    isPath(): boolean;
    isURL(): boolean;
    get type(): string;
}
export { PayloadType };
//# sourceMappingURL=payload.type.d.ts.map