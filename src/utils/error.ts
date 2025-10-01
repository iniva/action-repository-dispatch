export function getErrorMessage(error: unknown): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message?: unknown }).message === 'string'
  ) {
    return (error as { message: string }).message
  }

  try {
    return JSON.stringify(error)
  } catch {
    return String(error)
  }
}

export class WrappedError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message)
    this.name = 'WrappedError'
  }
}

export function wrapError(context: string, error: unknown): WrappedError {
  return new WrappedError(`${context}: ${getErrorMessage(error)}`, error)
}
