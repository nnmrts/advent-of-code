/**
 *
 * @param {number} number
 */
const getDivisors = (number) => new Set(
	Array.from(
		{ length: Math.floor(Math.sqrt(number)) },
		(empty, index) => /** @type {const} */ ([Number.isInteger(number / (index + 1)), index + 1])
	)
		.filter(([isDivisor]) => isDivisor)
		.flatMap(([isDivisor, divisor]) => [divisor, number / divisor])
		.toSorted((divisorA, divisorB) => divisorA - divisorB)
);

export default getDivisors;
