const maximumSafeDistance = 3;

/**
 *
 * @param {object} options
 * @param {"up"|"down"} options.direction
 * @param {number} options.level
 * @param {number} options.levelAfter
 */
const isLevelSafe = ({
	direction,
	level,
	levelAfter
}) => {
	const difference = level - levelAfter;

	const absoluteDifference = Math.abs(difference);

	return !(
		absoluteDifference === 0 ||
		absoluteDifference > maximumSafeDistance ||
		(
			(difference < 0 && direction !== "up") ||
			(difference > 0 && direction !== "down")
		)
	);
};

/**
 *
 * @param {readonly number[]} report
 * @param {number} allowedNumberOfErrors
 */
const isReportSafe = (report, allowedNumberOfErrors = 0) => {
	/**
	 * @type {"up"|"down"|undefined}
	 */
	let direction;

	let result = true;

	for (const [levelIndex, level] of report.entries()) {
		if (levelIndex === report.length - 1) {
			result = true;

			break;
		}

		const levelAfter = report[levelIndex + 1];

		const difference = level - levelAfter;

		if (direction === undefined) {
			direction = difference < 0 ? "up" : "down";
		}

		if (
			!isLevelSafe({
				direction,
				level,
				levelAfter
			})
		) {
			if (allowedNumberOfErrors === 0) {
				result = false;
				break;
			}
			else {
				result = report
					.some((innerLevel, index) => {
						const dampenedReport = [
							...report
								.slice(0, index),
							...report
								.slice(index + 1)
						];

						return isReportSafe(dampenedReport, allowedNumberOfErrors - 1);
					});

				break;
			}
		}
	}

	return result;
};

export default isReportSafe;
