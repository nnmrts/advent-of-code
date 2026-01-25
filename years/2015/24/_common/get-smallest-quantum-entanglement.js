import combineWithoutRepetitions from "../../17/_common/combine-without-repetitions.js";
import calculateProduct from "../../../2025/_common/calculate-product.js";
import calculateSum from "../../../_common/calculate-sum.js";

/**
 *
 * @param {readonly number[]} weights
 * @param {number} numberOfGroups
 */
const getSmallestQuantumEntanglement = (weights, numberOfGroups) => {
	const weightPerGroup = calculateSum(weights) / numberOfGroups;

	for (
		let groupSize = 1;
		groupSize <= weights.length - (numberOfGroups - 1);
		groupSize++
	) {
		const group = combineWithoutRepetitions(weights, groupSize)
			.find((innerGroup) => calculateSum(innerGroup) === weightPerGroup);

		if (group !== undefined) {
			return calculateProduct(group);
		}
	}

	return Infinity;
};

export default getSmallestQuantumEntanglement;
