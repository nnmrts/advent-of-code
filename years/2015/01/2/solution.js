import instructions from "../_common/instructions.js";

const parsedInstructions = [...instructions]
	.map((instructionString) => (2 * Number(instructionString === "(")) - 1);

let currentFloor = 0;

for (const [index, instruction] of parsedInstructions.entries()) {
	currentFloor += instruction;

	if (currentFloor === -1) {
		console.info(index + 1);
		break;
	}
}
