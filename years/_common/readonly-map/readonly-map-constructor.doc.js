/**
 * @typedef {{
 * new (): ReadonlyMap<any, any>,
 * new <K, V>(entries?: readonly (readonly [K, V])[] | null): ReadonlyMap<K, V>,
 * readonly prototype: ReadonlyMap<any, any>,
 * groupBy<K, T>(
 * items: Iterable<T>,
 * keySelector: (item: T, index: number) => K,
 * ): ReadonlyMap<K, T[]>,
 * new<E extends readonly [unknown, unknown]>(entries: readonly E[]): ReadonlyMap<E[0], E[1]>,
 * }} ReadonlyMapConstructor
 */
