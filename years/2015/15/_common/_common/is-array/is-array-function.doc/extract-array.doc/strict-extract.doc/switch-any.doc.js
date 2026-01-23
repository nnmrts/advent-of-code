/**
 * @import { anySymbol } from "./switch-any.doc/_exports.js";
 */

/**
 * @template T
 * @template U
 * @typedef {[T] extends [typeof anySymbol] ? U : T} SwitchAny
 */
