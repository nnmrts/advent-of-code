import {
	gaussianElimination,
	identifyFreeVariables,
	isSystemConsistent,
	search
} from "./solve-restricted-system/_exports.js";

/**
 * @param {object} options
 * @param {number[][]} options.matrix
 * @param {number[]} options.target
 * @param {number[]} options.bounds
 * @param {number} options.numberOfColumns
 * @param {number} options.numberOfRows
 */
const solveRestrictedSystem = ({
	bounds,
	matrix,
	numberOfColumns,
	numberOfRows,
	target
}) => {
	const copy = matrix.map((row) => [...row]);
	const rhs = [...target];

	const {
		columnToPivotRow,
		pivotColumnIndices,
		pivotRow
	} = gaussianElimination(copy, rhs, numberOfColumns, numberOfRows);

	const freeVariables = identifyFreeVariables(pivotColumnIndices, numberOfColumns);

	if (!isSystemConsistent(rhs, pivotRow, numberOfRows)) {
		return 0;
	}

	const { minimumPresses } = search({
		bounds,
		columnToPivotRow,
		freeVariables,
		matrixCopy: copy,
		numberOfColumns,
		pivotColumnIndices,
		rhs
	});

	return minimumPresses === Infinity ? 0 : minimumPresses;
};

export default solveRestrictedSystem;
