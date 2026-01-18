import lowerCaseACodePoint from "../_common/lower-case-a-code-point.js";

/**
 * @import { DecimalDigit } from "./convert-letter-to-decimal-digit/_exports.js";
 * @import { LowerCaseLetter } from "../../../../../_types/lower-case-letter.doc.js";
 */

/**
 * @param {LowerCaseLetter} letter
 */
const convertLetterToDecimalDigit = (letter) => /** @type {DecimalDigit} */ (
	letter.codePointAt(0) - lowerCaseACodePoint
);

export default convertLetterToDecimalDigit;
