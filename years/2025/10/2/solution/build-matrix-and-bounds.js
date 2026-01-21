/**
 * Builds matrix and bounds from button wiring schematics
 *
 * @param {number[][]} buttonWiringSchematics
 * @param {number[]} joltageRequirements
 */
const buildMatrixAndBounds = (buttonWiringSchematics, joltageRequirements) => {
	const numberOfCounters = joltageRequirements.length;
	const numberOfButtons = buttonWiringSchematics.length;

	const matrix = Array.from(
		{ length: numberOfCounters },
		() => Array.from({ length: numberOfButtons }, () => 0)
	);

	const strictBounds = Array.from({ length: numberOfButtons }, () => 0);

	for (const [schematicIndex, wiring] of buttonWiringSchematics.entries()) {
		for (const item of wiring) {
			if (item < numberOfCounters) {
				matrix[item][schematicIndex] = 1;
				if (
					strictBounds[schematicIndex] === 0 ||
					joltageRequirements[item] < strictBounds[schematicIndex]
				) {
					strictBounds[schematicIndex] = joltageRequirements[item];
				}
			}
		}
	}

	return {
		matrix,
		numberOfButtons,
		numberOfCounters,
		strictBounds
	};
};

export default buildMatrixAndBounds;
