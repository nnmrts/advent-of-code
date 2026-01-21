/**
 * @import { ReadonlyDeep } from "../readonly-deep.doc.js";
 */

/**
 * Same as `ReadonlyDeep`, but accepts only `ReadonlySet`s as inputs. Internal helper for `ReadonlyDeep`.
 *
 * @template ItemType
 * @typedef {Readonly<ReadonlySet<ReadonlyDeep<ItemType>>> & {}} ReadonlySetDeep
 */
