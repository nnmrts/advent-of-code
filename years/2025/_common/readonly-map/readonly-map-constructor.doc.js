/**
 * @typedef {{
 * new (): ReadonlyMap<any, any>,
 * new <K, V>(entries?: readonly (readonly [K, V])[] | null): ReadonlyMap<K, V>,
 * readonly prototype: ReadonlyMap<any, any>,
 * groupBy<K, T>(
 * items: Iterable<T>,
 * keySelector: (item: T, index: number) => K,
 * ): ReadonlyMap<K, T[]>
 * }} ReadonlyMapConstructor
 */
