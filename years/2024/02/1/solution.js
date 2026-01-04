import isReportSafe from "../_common/is-report-safe.js";
import reports from "../_common/reports.js";

const safeReports = reports
	.filter(isReportSafe);

console.info(safeReports.length);
