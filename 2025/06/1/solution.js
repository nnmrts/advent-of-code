import calculateSum from "../../../_common/calculate-sum.js";
import calculateProduct from "../../_common/calculate-product.js";
import input from "../_common/input.js";

/**
 * @typedef {"+"|"*"} Operation
 */

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
		rows[0]
			.map((column, columnIndex) => rows.map((row) => row[columnIndex]).toReversed())
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
