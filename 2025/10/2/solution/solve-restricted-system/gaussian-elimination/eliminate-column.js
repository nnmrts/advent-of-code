import basicallyZero from "../_common/basically-zero.js";

/**
 * Eliminates a column in other rows using the pivot row
 *
 * @param {number[][]} matrix
 * @param {number[]} rhs
 * @param {number} pivotRow
 * @param {number} columnIndex
 * @param {number} numberOfColumns
 * @param {number} numberOfRows
 */
const eliminateColumn = (matrix, rhs, pivotRow, columnIndex, numberOfColumns, numberOfRows) => {
	for (let index = 0; index < numberOfRows; index++) {
		if (index === pivotRow) {
			continue;
		}
		const factor = matrix[index][columnIndex];

		if (Math.abs(factor) <= basicallyZero) {
			continue;
		}
		for (let innerIndex = columnIndex; innerIndex < numberOfColumns; innerIndex++) {
			matrix[index][innerIndex] -= factor * matrix[pivotRow][innerIndex];
		}
		rhs[index] -= factor * rhs[pivotRow];
	}
};

export default eliminateColumn;
