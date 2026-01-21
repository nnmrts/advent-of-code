/**
 * @import { ReadonlyDeep } from "../readonly-deep.doc.js";
 */

/**
 * Same as `ReadonlyDeep`, but accepts only `ReadonlyMap`s as inputs. Internal helper for `ReadonlyDeep`.
 *
 * @template KeyType
 * @template ValueType
 * @typedef {Readonly<ReadonlyMap<ReadonlyDeep<KeyType>, ReadonlyDeep<ValueType>>> & {}} ReadonlyMapDeep
 */
