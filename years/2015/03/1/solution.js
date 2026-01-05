import instructions from "../_common/instructions.js";

const currentCoordinates = [0, 0];

const houseCoordinateStrings = new Set([currentCoordinates.join(",")]);

for (const instruction of instructions) {
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

console.info(houseCoordinateStrings.size);
