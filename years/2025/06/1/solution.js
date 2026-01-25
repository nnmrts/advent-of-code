import calculateProduct from "../../../_common/calculate-product.js";
import calculateSum from "../../../_common/calculate-sum.js";
import input from "../_common/input.js";

/**
 * @typedef {"+" | "*"} Operation
 */

/**
 * @template {readonly (readonly unknown[])[]} MatrixTemplate
 * @param {MatrixTemplate} matrix
 * @example
 */
const rotateMatrix = (matrix) => matrix[0]
	.map((value, index) => (
		matrix
			.map((row) => row[index]).toReversed()
	));

const rows = /** @type {readonly [...readonly (readonly number[])[], readonly Operation[]]} */ (
	/** @type {unknown} */ (
		input
			.trim()
			.split("\n")
			.map((row, index, array) => {
				const items = row.split(/\s+/v);

				return index === array.length - 1
					? items
					: items.map(Number);
			})
	)
);

const columns = /** @type {readonly (readonly [Operation, ...readonly number[]])[]} */ (
	/** @type {unknown} */ (
		rotateMatrix(rows)
	)
);

console.info(
	calculateSum(
		columns.map(([operation, ...numbers]) => (
			operation === "+"
				? calculateSum(numbers)
				: calculateProduct(numbers)
		))
	)
);
