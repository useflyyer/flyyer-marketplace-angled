export function IS_FINITE(value: unknown): value is number {
  return Number.isFinite(value);
}
