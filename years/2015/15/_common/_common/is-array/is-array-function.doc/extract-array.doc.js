/**
 * @import { StrictExtract } from "./extract-array.doc/_exports.js";
 */

/**
 * @template Template
 * @typedef {(
 * Template extends any
 *   ? [StrictExtract<Template, readonly any[]>] extends [readonly any[]]
 *     ? Extract<Template, readonly any[]>
 *     : [StrictExtract<Template, any[]>] extends [any[]]
 *       ? Extract<Template, any[]>
 *       : unknown[] extends Template
 *         ? unknown[]
 *         : never
 *   : never
 * )} ExtractArray
 */
