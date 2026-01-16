/**
 * @import { SwitchAny, SwitchNever } from "./strict-extract.doc/_exports.js";
 */

/**
 * @template T
 * @template U
 * @typedef {SwitchNever<Extract<SwitchAny<T, unknown>, U>, unknown>} StrictExtract
 */
