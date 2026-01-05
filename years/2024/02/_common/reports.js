import getInput from "../../../_common/get-input.js";

const input = await getInput();

const reports = input
	.trim()
	.split("\n")
	.map((reportString) => reportString.split(/\s+/v).map(Number));

export default reports;
