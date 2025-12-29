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
			.map((row) => [...row])
	)
);

const columns = /** @type {readonly (readonly [Operation, ...readonly number[]])[]} */ (
	/** @type {unknown} */ (
		rows[0]
			.map((column, columnIndex) => rows.map((row) => row[columnIndex]).join(""))
			.join("\n")
			.split(/\n\s*\n/v)
			.map((column) => {
				const [firstValue, operation, ...rest] = column
					.split(/\s+/v)
					.flatMap((value) => value.split(/(?=\+|\*)/v))
					.filter((value) => value !== "");

				return [operation, Number(firstValue), ...rest.map(Number)];
			})
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
