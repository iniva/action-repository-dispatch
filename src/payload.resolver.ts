export type ClientPayload = Record<string, unknown>

export interface PayloadResolver {
  resolve(payload: string): Promise<ClientPayload>
}
