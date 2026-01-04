/**
 * @param {readonly number[]} array - The array of numbers to sum.
 */
const calculateSum = (array) => array.reduce(
	(previousValue, currentValue) => previousValue + currentValue,
	0
);

export default calculateSum;
