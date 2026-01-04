import {
	eliminateColumn,
	findPivotRow,
	normalizePivotRow
} from "./gaussian-elimination/_exports.js";

/**
 * Performs Gaussian elimination to get reduced row echelon form
 *
 * @param {number[][]} copy
 * @param {number[]} rhs
 * @param {number} numberOfColumns
 * @param {number} numberOfRows
 */
const gaussianElimination = (copy, rhs, numberOfColumns, numberOfRows) => {
	/** @type {number[]} */
	const pivotColumnIndices = [];
	const columnToPivotRow = new Map();
	let pivotRow = 0;

	for (
		let columnIndex = 0;
		columnIndex < numberOfColumns && pivotRow < numberOfRows;
		columnIndex++
	) {
		const rowSelection = findPivotRow(copy, columnIndex, pivotRow, numberOfRows);

		if (rowSelection === numberOfRows) {
			continue;
		}

		[copy[pivotRow], copy[rowSelection]] = [copy[rowSelection], copy[pivotRow]];
		[rhs[pivotRow], rhs[rowSelection]] = [rhs[rowSelection], rhs[pivotRow]];

		normalizePivotRow(copy, rhs, pivotRow, columnIndex, numberOfColumns);
		eliminateColumn(copy, rhs, pivotRow, columnIndex, numberOfColumns, numberOfRows);

		pivotColumnIndices.push(columnIndex);
		columnToPivotRow.set(columnIndex, pivotRow);
		pivotRow += 1;
	}

	return {
		columnToPivotRow,
		pivotColumnIndices,
		pivotRow
	};
};

export default gaussianElimination;
