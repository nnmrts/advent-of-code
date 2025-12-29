import product from "../../_common/product.js";
import sum from "../../_common/sum.js";
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
	sum(
		columns.map(([operation, ...numbers]) => (
			operation === "+"
				? sum(numbers)
				: product(numbers)
		))
	)
);
