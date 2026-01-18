/**
 * @import { WritableDeep } from "../writable-deep.doc.js";
 */

/**
 * Same as `WritableDeep`, but accepts only `object`s as inputs. Internal helper for `WritableDeep`.
 *
 * @template {object} ObjectType
 * @typedef {(
 * {
 * 	-readonly [KeyType in keyof ObjectType]: WritableDeep<ObjectType[KeyType]>
 * }
 * )} WritableObjectDeep
 */
