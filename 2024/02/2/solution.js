import isReportSafe from "../_common/is-report-safe.js";
import reports from "../_common/reports.js";

const safeReports = reports
	.filter((report) => isReportSafe(report, 1));

console.info(safeReports.length);
