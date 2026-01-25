import calculateProduct from "../../../_common/calculate-product.js";
import distances from "../_common/distances.js";

const junctionBoxesLimit = 1_000;
const circuitsLimit = 3;

/**
 * @type {Set<number>[]}
 */
let circuits = [];

for (const [indexA, indexB] of distances.slice(0, junctionBoxesLimit)) {
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
}

console.info(
	calculateProduct(
		circuits
			.toSorted((circuitA, circuitB) => circuitB.size - circuitA.size)
			.slice(0, circuitsLimit)
			.map((circuit) => circuit.size)
	)
);
