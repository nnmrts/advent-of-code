import { location } from "./solution/_exports.js";

const {
	column,
	row
} = location;

const factor = 252_533n;
const divisor = 33_554_393n;

let rowIndex = 1;
let code = 20_151_125n;

outerLoop: while (true) {
	for (let columnIndex = 0; columnIndex <= rowIndex; columnIndex++) {
		const currentRow = rowIndex + 1 - columnIndex;
		const currentColumn = columnIndex + 1;

		code = (code * factor) % divisor;

		if (currentRow === row && currentColumn === column) {
			console.info(Number(code));
			break outerLoop;
		}
	}

	rowIndex += 1;
}
