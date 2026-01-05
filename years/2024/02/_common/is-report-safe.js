const maximumSafeDistance = 3;

/**
 *
 * @param {readonly number[]} report
 * @param {number} allowedNumberOfErrors
 */
const isReportSafe = (report, allowedNumberOfErrors = 0) => {
	let direction;

	let result = true;

	let numberOfErrors = 0;

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
			absoluteDifference > maximumSafeDistance ||
			(
				direction !== undefined &&
				(
					(difference < 0 && direction !== "up") ||
					(difference > 0 && direction !== "down")
				)
			)
		) {
			numberOfErrors += 1;

			if (numberOfErrors > allowedNumberOfErrors) {
				result = false;
				break;
			}
		}

		if (direction === undefined) {
			direction = difference < 0 ? "up" : "down";
		}
	}

	return result;
};

export default isReportSafe;
