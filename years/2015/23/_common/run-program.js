/* eslint-disable no-magic-numbers -- needed in definition */

/**
 * @import program from "./program.js";
 */

/**
 * @param {typeof program} program
 */
const runProgram = ({
	lines,
	registers
}) => {
	let currentLineNumber = 1;

	mainLoop: while (true) {
		const currentLine = lines.get(currentLineNumber);

		if (currentLine === undefined) {
			break;
		}

		const {
			instruction,
			offset,
			register
		} = currentLine;

		switch (instruction) {
			case "hlf":
				registers.set(register, (registers.get(register) ?? 2) / 2);
				currentLineNumber += 1;
				break;

			case "inc":
				registers.set(register, (registers.get(register) ?? 0) + 1);
				currentLineNumber += 1;
				break;

			case "jie":
				currentLineNumber += (registers.get(register) ?? 0) % 2 === 0
					? offset
					: 1;
				break;

			case "jio":
				currentLineNumber += (registers.get(register) ?? 0) === 1
					? offset
					: 1;
				break;

			case "jmp":
				currentLineNumber += offset;
				break;

			case "tpl":
				registers.set(register, (registers.get(register) ?? 0) * 3);
				currentLineNumber += 1;
				break;

			default:
				break mainLoop;
		}
	}

	return registers;
};

export default runProgram;
