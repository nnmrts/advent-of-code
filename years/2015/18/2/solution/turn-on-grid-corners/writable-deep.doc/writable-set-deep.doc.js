/**
 * @import { WritableDeep } from "../writable-deep.doc.js";
 */

/**
 * Same as `WritableDeep`, but accepts only `Set`s as inputs. Internal helper for `WritableDeep`.
 *
 * @template {ReadonlySet<unknown>} SetType
 * @typedef {(
 * 	SetType extends ReadonlySet<infer ItemType>
 * 		? Set<WritableDeep<ItemType>>
 * 		: SetType
 * )} WritableSetDeep
 */
