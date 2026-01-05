import getInput from "../../../_common/get-input.js";

const input = await getInput();

const presents = input
	.trim()
	.split("\n")
	.map((line) => {
		const [length, width, height] = line.split("x").map(Number);

		return {
			height,
			length,
			width
		};
	});

export default presents;
