import { backSubstitute } from "./search/_exports.js";

/**
 * @param {object} options
 * @param {number} [options.minimumPresses]
 * @param {number[]} options.bounds
 * @param {Map<number, number>} options.columnToPivotRow
 * @param {number} [options.currentCost]
 * @param {number} [options.freeVariableListIndex]
 * @param {number[]} options.freeVariables
 * @param {number[][]} options.matrixCopy
 * @param {number} options.numberOfColumns
 * @param {number[]} options.pivotColumnIndices
 * @param {number[]} options.rhs
 * @param {number[]} [options.currentSolution]
 */
const search = ({
	minimumPresses = Infinity,
	bounds,
	columnToPivotRow,
	currentCost = 0,
	numberOfColumns,
	currentSolution = Array.from({ length: numberOfColumns }, () => 0),
	freeVariableListIndex = 0,
	freeVariables,
	matrixCopy,
	pivotColumnIndices,
	rhs
}) => {
	let nextSolution = [...currentSolution];

	if (currentCost >= minimumPresses) {
		return {
			minimumPresses,
			currentSolution: nextSolution
		};
	}

	if (freeVariableListIndex === freeVariables.length) {
		const { derivedCost, possible } = backSubstitute({
			minimumPresses,
			nextSolution,
			bounds,
			columnToPivotRow,
			currentCost,
			matrixCopy,
			pivotColumnIndices,
			rhs
		});

		return {
			minimumPresses: possible ? derivedCost : minimumPresses,
			currentSolution: nextSolution
		};
	}

	const freeVariableIndex = freeVariables[freeVariableListIndex];
	const freeVariableBound = bounds[freeVariableIndex];
	let currentMinimumPresses = minimumPresses;

	for (let value = 0; value <= freeVariableBound; value++) {
		nextSolution[freeVariableIndex] = value;
		({ minimumPresses: currentMinimumPresses, currentSolution: nextSolution } = search({
			minimumPresses: currentMinimumPresses,
			bounds,
			columnToPivotRow,
			currentCost: currentCost + value,
			currentSolution: nextSolution,
			freeVariableListIndex: freeVariableListIndex + 1,
			freeVariables,
			matrixCopy,
			numberOfColumns,
			pivotColumnIndices,
			rhs
		}));
	}

	return {
		minimumPresses: currentMinimumPresses,
		currentSolution: nextSolution
	};
};

export default search;
