/**
 *
 * @param report
 * @example
 */
const isReportSafe = (report) => {
	let direction;

	let result = false;

	for (const [levelIndex, level] of report.entries()) {
		if (levelIndex === report.length - 1) {
			result = true;

			break;
		}

		const levelAfter = report[levelIndex + 1];

		const difference = level - levelAfter;

		const absoluteDifference = Math.abs(difference);

		if (
			absoluteDifference === 0 ||
			absoluteDifference > 3 ||
			(
				direction !== undefined &&
				(
					(difference < 0 && direction !== "up") ||
					(difference > 0 && direction !== "down")
				)
			)
		) {
			result = false;

			break;
		}

		if (direction === undefined) {
			direction = difference < 0 ? "up" : "down";
		}
	}

	return result;
};

export default isReportSafe;
