import { wrapError } from './error';

export function safeJsonParse<T = unknown>(raw: string, context = 'JSON parse'): T {
  try {
    return JSON.parse(raw) as T;
  } catch (e: unknown) {
    throw wrapError(context, e);
  }
}

export function ensureRecord(
  value: unknown,
  context = 'Expected JSON object',
): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${context}: received ${Array.isArray(value) ? 'array' : typeof value}`);
  }

  return value as Record<string, unknown>;
}
