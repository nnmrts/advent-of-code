import { almostZero } from "./_common/_exports.js";

/**
 * Checks if the system is consistent (no contradictory equations)
 *
 * @param {number[]} rhs
 * @param {number} pivotRow
 * @param {number} numberOfRows
 */
const isSystemConsistent = (rhs, pivotRow, numberOfRows) => {
	for (let index = pivotRow; index < numberOfRows; index++) {
		if (Math.abs(rhs[index]) > almostZero) {
			return false;
		}
	}

	return true;
};

export default isSystemConsistent;
