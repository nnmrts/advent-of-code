import getInput from "../../../_common/get-input.js";
import transposeMatrix from "../../../_common/transpose-matrix.js";

const input = await getInput();

const locationColumns = transposeMatrix(
	input
		.trim()
		.split("\n")
		.map((line) => line.split(/\s+/v).map(Number))
);

export default locationColumns;
