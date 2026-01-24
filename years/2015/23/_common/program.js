import getInput from "../../../_common/get-input.js";

/**
 * @import UnknownArray from "../../../../types/_common/unknown-array.d.ts";
 */

/**
 * @template ArrayTemplate
 * @typedef {ArrayTemplate extends UnknownArray ? ArrayTemplate[number] : never} ArrayElement
 */

const input = await getInput();

const registers = /** @type {const} */ (["a", "b"]);

/**
 * @typedef {ArrayElement<typeof registers>} Register
 */

const arithmeticInstructions = /** @type {const} */ (["hlf", "tpl", "inc"]);

/**
 * @typedef {ArrayElement<typeof arithmeticInstructions>} ArithmeticInstruction
 */

const jumpInstruction = "jmp";

/**
 * @typedef {typeof jumpInstruction} JumpInstruction
 */

const conditionalJumpInstructions =/** @type {const} */ (["jie", "jio"]);

/**
 * @typedef {ArrayElement<typeof conditionalJumpInstructions>} ConditionalJumpInstruction
 */

/**
 * @typedef {ArithmeticInstruction|JumpInstruction|ConditionalJumpInstruction} Instruction
 */

/**
 * @typedef {(
 * `${ArithmeticInstruction} ${Register}` |
 * `${JumpInstruction} ${number}` |
 * `${ConditionalJumpInstruction} ${Register}, ${number}`
 * )} InputLine
 */

const lines = /** @type {readonly InputLine[]} */ (
	input
		.trim()
		.split("\n")
);

/**
 *
 * @template {string} PrefixTemplate
 * @param {string} string
 * @param {readonly PrefixTemplate[]} prefixes
 * @returns {string is `${PrefixTemplate}${string}`}
 */
const startsWithSome = (string, prefixes) => prefixes.some((prefix) => string.startsWith(prefix));

const programLines = new Map(
	lines
		.map((line, index) => {
			const lineNumber = index + 1;

			switch (true) {
				case startsWithSome(line, arithmeticInstructions): {
					const [instruction, register] = line.split(" ");

					return /** @type {const} */ ([
						lineNumber,
						{
							instruction,
							offset: null,
							register
						}
					]);
				}

				case line.startsWith(jumpInstruction): {
					const [instruction, offsetString] = line.split(" ");

					const offset = Number(offsetString);

					return /** @type {const} */ ([
						lineNumber,
						{
							instruction,
							offset,
							register: null
						}
					]);
				}

				case startsWithSome(line, conditionalJumpInstructions): {
					const [instructionAndRegister, offsetString] = line.split(",");

					const offset = Number(offsetString);

					const [instruction, register] = instructionAndRegister.split(" ");

					return /** @type {const} */ ([
						lineNumber,
						{
							instruction,
							offset,
							register
						}
					]);
				}

				default:
					throw new Error(`Unknown instruction: ${line}`);
			}
		})
);

const programRegisters = new Map(
	registers.map((register) => /** @type {readonly [Register, number]} */ (
		[register, 0]
	))
);

const program = /** @type {const} */ ({
	lines: programLines,
	registers: programRegisters
});

export default program;
