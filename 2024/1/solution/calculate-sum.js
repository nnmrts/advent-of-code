/**
 *
 * @param array
 * @example
 */
const calculateSum = (array) => array.reduce(
	(previousValue, currentValue) => previousValue + currentValue,
	0
);

export default calculateSum;
