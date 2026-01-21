import {
	gaussianElimination,
	identifyFreeVariables,
	search
} from "./solve-restricted-system/_exports.js";

/**
 * @import { ReadonlyDeep } from "./solve-restricted-system/_exports.js";
 */

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
		pivotColumnIndices
	} = gaussianElimination(copy, rhs, numberOfColumns, numberOfRows);

	const freeVariables = identifyFreeVariables(pivotColumnIndices, numberOfColumns);

	const { minimumPresses } = search({
		bounds,
		columnToPivotRow: /** @type {ReadonlyDeep<typeof columnToPivotRow>} */ (columnToPivotRow),
		freeVariables,
		matrixCopy: copy,
		numberOfColumns,
		pivotColumnIndices,
		rhs
	});

	return minimumPresses;
};

export default solveRestrictedSystem;
