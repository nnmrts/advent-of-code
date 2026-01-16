/**
 * @import { IsArrayFunction } from "./is-array/_exports.js";
 */

const isArray = /** @type {IsArrayFunction} */ (
	(() => Array.isArray)()
);

export default isArray;
