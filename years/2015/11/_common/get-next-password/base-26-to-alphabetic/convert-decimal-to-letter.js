import lowerCaseACodePoint from "../_common/lower-case-a-code-point.js";

/**
 * @import { LowerCaseLetter } from "../_types/lower-case-letter.doc.js";
 */

/**
 * @param {number} number
 */
const convertDecimalToLetter = (number) => /** @type {LowerCaseLetter} */ (
	String.fromCodePoint(lowerCaseACodePoint + number)
);

export default convertDecimalToLetter;
