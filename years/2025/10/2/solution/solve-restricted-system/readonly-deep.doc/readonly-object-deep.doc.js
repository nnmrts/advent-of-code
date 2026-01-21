/**
 * @import { ReadonlyDeep } from "../readonly-deep.doc.js";
 */

/**
 * Same as `ReadonlyDeep`, but accepts only `object`s as inputs. Internal helper for `ReadonlyDeep`.
 *
 * @template {object} ObjectType
 * @typedef {{
 * 	readonly [KeyType in keyof ObjectType]: ReadonlyDeep<ObjectType[KeyType]>
 * }} ReadonlyObjectDeep
 */
