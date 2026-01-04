import getInput from "../../../_common/get-input.js";

const input = await getInput();

const reports = input
	.split("\n")
	.filter((line) => line.match(/^(?:\d+ )+\d+$/v))
	.map((reportString) => reportString.split(/\s+/v).map(Number));

export default reports;
