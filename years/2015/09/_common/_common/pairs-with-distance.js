import getInput from "../../../../_common/get-input.js";

/**
 * @typedef {`${string} to ${string} = ${number}`} InputLine
 */

const input = await getInput();

const lines = /** @type {readonly InputLine[]} */ (
	input
		.trim()
		.split("\n")
);

const pairsWithDistance = lines
	.map((line) => {
		const [
			locationA,
			to,
			locationB,
			equals,
			distanceString
		] = line.split(" ");

		return {
			distance: Number(distanceString),
			locations: [locationA, locationB]
		};
	});

export default pairsWithDistance;
