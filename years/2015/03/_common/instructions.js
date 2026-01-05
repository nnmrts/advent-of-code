import getInput from "../../../_common/get-input.js";

const input = await getInput();

const instructions = [
	...input
		.trim()
]
	.map(
		(character) => {
			switch (character) {
				case "<":
					return "left";
				case ">":
					return "right";
				case "^":
					return "up";
				case "v":
					return "down";

				// no default
			}

			throw new Error(`unsupported instruction "${character}"`);
		}
	);

export default instructions;
