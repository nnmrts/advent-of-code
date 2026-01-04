/**
 * @import { TransposeMatrix } from "./transpose-matrix/_exports.js";
 */

/**
 * @template {readonly (readonly unknown[])[]} MatrixTemplate
 * @param {MatrixTemplate} matrix
 * @returns {TransposeMatrix<MatrixTemplate>}
 * @example
 */
const transposeMatrix = (matrix) => /** @type {TransposeMatrix<MatrixTemplate>} */ (
	matrix[0]
		.map((value, index) => (
			matrix
				.map((row) => row[index])
		))
);

export default transposeMatrix;
