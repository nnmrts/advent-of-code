/**
 * @import { WritableDeep } from "../writable-deep.doc.js";
 */

/**
 * Same as `WritableDeep`, but accepts only `Map`s as inputs. Internal helper for `WritableDeep`.
 *
 * @template {ReadonlyMap<unknown, unknown>} MapType
 * @typedef {(
 * MapType extends ReadonlyMap<infer KeyType, infer ValueType>
 * 		? Map<WritableDeep<KeyType>, WritableDeep<ValueType>>
 * 		: MapType
 * )} WritableMapDeep
 */
