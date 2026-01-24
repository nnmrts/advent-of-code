/* eslint-disable no-magic-numbers -- needed in definition */
/* eslint-disable no-bitwise -- literally the puzzle */
import instructions from "../_common/instructions.js";

const visitedWires = new Map();

/**
 *
 * @param {string | number} wire
 * @returns {number}
 * @throws {Error}
 */
const resolve = (wire) => {
	if (typeof wire === "number") {
		return wire;
	}

	if (
		visitedWires.has(wire)
	) {
		return visitedWires.get(wire);
	}

	const instructionForWire = instructions
		.find(({ receivingWire }) => receivingWire === wire);

	if (instructionForWire === undefined) {
		throw new Error(`wire ${wire} not found`);
	}

	const { calculation } = instructionForWire;

	let result;

	switch (calculation.length) {
		case 1:
			result = resolve(calculation[0]);
			break;
		case 2:
			result = ~resolve(calculation[1]);
			break;

		case 3: {
			const [leftHandSide, operation, rightHandSide] = calculation;

			switch (operation) {
				case "AND":
					result = resolve(leftHandSide) & resolve(rightHandSide);
					break;
				case "LSHIFT":
					result = resolve(leftHandSide) << resolve(rightHandSide);
					break;
				case "OR":
					result = resolve(leftHandSide) | resolve(rightHandSide);
					break;
				case "RSHIFT":
					result = resolve(leftHandSide) >> resolve(rightHandSide);
					break;
				// no default
			}

			break;
		}
		// no default
	}

	visitedWires.set(wire, result);

	return result;
};

console.info(resolve("a"));
