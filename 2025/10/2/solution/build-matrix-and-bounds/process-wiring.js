/**
 * Processes a single wiring schematic to update matrix and bounds
 *
 * @param {number[] | undefined} wiring
 * @param {number} schematicIndex
 * @param {number[][]} matrix
 * @param {number[]} strictBounds
 * @param {number[]} joltageRequirements
 * @param {number} numberOfCounters
 */
const processWiring = (
	wiring,
	schematicIndex,
	matrix,
	strictBounds,
	joltageRequirements,
	numberOfCounters
) => {
	if (wiring === undefined || wiring.length === 0) {
		strictBounds[schematicIndex] = 0;

		return;
	}

	for (const item of wiring) {
		if (item < numberOfCounters) {
			matrix[item][schematicIndex] = 1;
			if (joltageRequirements[item] < strictBounds[schematicIndex]) {
				strictBounds[schematicIndex] = joltageRequirements[item];
			}
		}
	}
};

export default processWiring;
