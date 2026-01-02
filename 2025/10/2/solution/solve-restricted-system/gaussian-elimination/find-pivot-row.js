import basicallyZero from "../_common/basically-zero.js";

/**
 * Finds the first row with non-zero value in a column
 *
 * @param {number[][]} matrix
 * @param {number} columnIndex
 * @param {number} startRow
 * @param {number} numberOfRows
 */
const findPivotRow = (matrix, columnIndex, startRow, numberOfRows) => {
	let rowSelection = startRow;

	while (
		rowSelection < numberOfRows &&
		Math.abs(matrix[rowSelection][columnIndex]) < basicallyZero
	) {
		rowSelection += 1;
	}

	return rowSelection;
};

export default findPivotRow;
