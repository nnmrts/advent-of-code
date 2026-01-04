/**
 *
 * @param {readonly number[]} array - The array of numbers to multiply.
 */
const calculateProduct = (array) => array
	.reduce((previousValue, currentValue) => previousValue * currentValue, 1);

export default calculateProduct;
