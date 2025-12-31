import distances from "../_common/distances.js";
import junctionBoxes from "../_common/junction-boxes.js";

/**
 * @type {Set<number>[]}
 */
let circuits = [];

for (const [distanceIndex, [indexA, indexB]] of distances.entries()) {
	const relevantCircuits = circuits
		.filter((circuit) => [indexA, indexB]
			.some((index) => circuit.has(index)));

	switch (relevantCircuits.length) {
		case 0:
			circuits.push(new Set([indexA, indexB]));

			break;

		case 1:
			for (const index of [indexA, indexB]) {
				relevantCircuits[0].add(index);
			}

			break;

		case 2:
			circuits = circuits
				.filter((circuit) => circuit !== relevantCircuits[1]);

			for (const index of [...relevantCircuits[1], indexA, indexB]) {
				relevantCircuits[0].add(index);
			}

			break;

		default:
			// no default
	}

	if (circuits.length === 1 && distanceIndex !== 0) {
		const [xA] = junctionBoxes[indexA];
		const [xB] = junctionBoxes[indexB];

		console.info(xA * xB);

		break;
	}
}
