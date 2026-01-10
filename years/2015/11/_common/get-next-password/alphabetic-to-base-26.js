import base from "../_common/base.js";

import { convertLetterToDecimalDigit } from "./alphabetic-to-base-26/_exports.js";

/**
 * @import { LowerCaseLetter } from "./_types/_exports.js";
 */

/**
 * @param {string} alphabetic
 */
const alphabeticToBase26 = (alphabetic) => [...alphabetic]
	.map(
		(digit) => (convertLetterToDecimalDigit(/** @type {LowerCaseLetter} digit */ (digit)))
			.toString(base)
	).join("");

export default alphabeticToBase26;
