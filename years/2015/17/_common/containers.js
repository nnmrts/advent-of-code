import getInput from "../../../_common/get-input.js";

const input = await getInput();

const containers = input
	.trim()
	.split("\n")
	.map(Number);

export default containers;
