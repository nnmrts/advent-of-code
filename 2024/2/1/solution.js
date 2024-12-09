import getInput from "../../../_common/get-input.js";

import { isReportSafe } from "./solution/_exports.js";

const input = await getInput();

const reports = input
	.split("\n")
	.filter((line) => line.match(/^(?:\d+ )+\d+$/v))
	.map((reportString) => reportString.split(/\s+/v).map(Number));

const safeReports = reports
	.filter(isReportSafe);

console.info(safeReports.length);
