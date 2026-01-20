import calculateSum from "../../../../_common/calculate-sum.js";

/**
 * @param {number} number
 */
const getHarmonicNumber = (number) => calculateSum(
	Array.from(
		{ length: number },
		(empty, index) => 1 / (index + 1)
	)
);

export default getHarmonicNumber;
