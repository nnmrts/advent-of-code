import { processWiring } from "./build-matrix-and-bounds/_exports.js";

/**
 * Builds matrix and bounds from button wiring schematics
 *
 * @param {(number[] | undefined)[]} buttonWiringSchematics
 * @param {number[]} joltageRequirements
 */
const buildMatrixAndBounds = (buttonWiringSchematics, joltageRequirements) => {
	const numberOfCounters = joltageRequirements.length;
	const numberOfButtons = buttonWiringSchematics.length;

	const matrix = Array.from(
		{ length: numberOfCounters },
		() => Array.from({ length: numberOfButtons }, () => 0)
	);

	const strictBounds = Array.from({ length: numberOfButtons }, () => Infinity);

	for (const [schematicIndex, wiring] of buttonWiringSchematics.entries()) {
		processWiring(
			wiring,
			schematicIndex,
			matrix,
			strictBounds,
			joltageRequirements,
			numberOfCounters
		);
	}

	const finalBounds = strictBounds.map((value) => (value === Infinity ? 0 : value));

	return {
		matrix,
		numberOfButtons,
		numberOfCounters,
		strictBounds: finalBounds
	};
};

export default buildMatrixAndBounds;
