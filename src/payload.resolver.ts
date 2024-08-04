export interface PayloadResolver {
  resolve(payload: string): Promise<any>
}
