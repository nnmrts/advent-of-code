import {
	computeDerivedValue,
	validateDerivedValue
} from "./back-substitute/_exports.js";

/**
 * Performs back-substitution to derive pivot variable values
 *
 * @param {object} options
 * @param {number[]} options.bounds
 * @param {ReadonlyMap<number, number>} options.columnToPivotRow
 * @param {number} options.currentCost
 * @param {number[][]} options.matrixCopy
 * @param {number} options.minimumPresses
 * @param {number[]} options.nextSolution
 * @param {number[]} options.pivotColumnIndices
 * @param {number[]} options.rhs
 */
const backSubstitute = ({
	minimumPresses,
	nextSolution,
	bounds,
	columnToPivotRow,
	currentCost,
	matrixCopy,
	pivotColumnIndices,
	rhs
}) => {
	let derivedCost = currentCost;

	for (const pivotColumnIndex of pivotColumnIndices.toReversed()) {
		const pivotRowIndex = columnToPivotRow.get(pivotColumnIndex);

		const derivedValue = computeDerivedValue(
			matrixCopy,
			rhs,
			nextSolution,
			pivotRowIndex,
			pivotColumnIndex
		);

		const { rounded, valid } = validateDerivedValue(derivedValue, bounds[pivotColumnIndex]);

		if (!valid) {
			return {
				derivedCost,
				possible: false
			};
		}

		nextSolution[pivotColumnIndex] = rounded;
		derivedCost += rounded;

		if (derivedCost >= minimumPresses) {
			return {
				derivedCost,
				possible: false
			};
		}
	}

	return {
		derivedCost,
		possible: true
	};
};

export default backSubstitute;
