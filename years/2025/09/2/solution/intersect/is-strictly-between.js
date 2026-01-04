/**
 *
 * @param {number} testValue
 * @param {number} extremeA
 * @param {number} extremeB
 */
const isStrictlyBetween = (testValue, extremeA, extremeB) => (
	testValue > Math.min(extremeA, extremeB) &&
	testValue < Math.max(extremeA, extremeB)
);

export default isStrictlyBetween;
