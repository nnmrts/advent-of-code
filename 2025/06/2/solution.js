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
	calculateSum(
		columns.map(([operation, ...numbers]) => (
			operation === "+"
				? calculateSum(numbers)
				: calculateProduct(numbers)
		))
	)
);
