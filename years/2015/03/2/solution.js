import instructions from "../_common/instructions.js";

const [santaInstructions, roboSantaInstructions] = [
	...Map.groupBy(
		instructions,
		(instruction, index) => index % 2 === 0
	)
]
	.map(([check, innerInstructions]) => innerInstructions);

/**
 *
 * @param {instructions[number][]} currentInstructions
 */
const deliverPresents = (currentInstructions) => {
	const currentCoordinates = [0, 0];

	const houseCoordinateStrings = new Set([currentCoordinates.join(",")]);

	for (const instruction of currentInstructions) {
		switch (instruction) {
			case "down":
				currentCoordinates[1] += 1;
				break;
			case "left":
				currentCoordinates[0] -= 1;
				break;
			case "right":
				currentCoordinates[0] += 1;
				break;
			case "up":
				currentCoordinates[1] -= 1;
				break;

			// no default
		}

		houseCoordinateStrings.add(currentCoordinates.join(","));
	}

	return houseCoordinateStrings;
};

console.info(
	deliverPresents(santaInstructions).union(deliverPresents(roboSantaInstructions)).size
);
