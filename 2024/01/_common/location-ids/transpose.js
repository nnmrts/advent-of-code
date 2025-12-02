/**
 * @import { Transpose } from "./transpose/_exports.js";
 */

/**
 * @template {unknown[][]} MatrixTemplate
 * @param {MatrixTemplate} matrix
 * @returns {Transpose<MatrixTemplate>}
 * @example
 */
const transpose = (matrix) => /** @type {Transpose<MatrixTemplate>} */ (
	matrix[0]
		.map((value, index) => (
			matrix
				.map((row) => row[index])
		))
);

export default transpose;
