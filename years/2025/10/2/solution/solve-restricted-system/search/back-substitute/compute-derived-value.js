import basicallyZero from "../../_common/basically-zero.js";

/**
 * Computes derived value from RHS and matrix coefficients
 *
 * @param {number[][]} matrixCopy
 * @param {number[]} rhs
 * @param {number[]} solution
 * @param {number} pivotRowIndex
 * @param {number} pivotColumnIndex
 */
const computeDerivedValue = (matrixCopy, rhs, solution, pivotRowIndex, pivotColumnIndex) => {
	let derivedValue = rhs[pivotRowIndex];
	const columnSlice = matrixCopy[pivotRowIndex].slice(pivotColumnIndex + 1);

	for (const [columnIndex, column] of columnSlice.entries()) {
		if (Math.abs(column) > basicallyZero) {
			derivedValue -= column * solution[columnIndex + pivotColumnIndex + 1];
		}
	}

	return derivedValue;
};

export default computeDerivedValue;
