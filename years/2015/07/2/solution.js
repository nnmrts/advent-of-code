/* eslint-disable no-magic-numbers -- needed in definition */
/* eslint-disable no-bitwise -- literally the puzzle */
import instructions from "../_common/instructions.js";

const firstVisitedWires = new Map();

/**
 *
 * @param {string | number} wire
 * @param {Map<string, number>} visitedWires
 * @returns {number}
 * @throws {Error}
 */
const resolve = (wire, visitedWires) => {
	if (typeof wire === "number") {
		return wire;
	}

	if (
		visitedWires.has(wire)
	) {
		// @ts-ignore
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
			result = resolve(calculation[0], visitedWires);
			break;
		case 2:
			result = ~resolve(calculation[1], visitedWires);
			break;

		case 3: {
			const [leftHandSide, operation, rightHandSide] = calculation;

			switch (operation) {
				case "AND":
					result = (
						resolve(leftHandSide, visitedWires) &
						resolve(rightHandSide, visitedWires)
					);
					break;
				case "LSHIFT":
					result = (
						resolve(leftHandSide, visitedWires) <<
						resolve(rightHandSide, visitedWires)
					);
					break;
				case "OR":
					result = (
						resolve(leftHandSide, visitedWires) |
						resolve(rightHandSide, visitedWires)
					);
					break;
				case "RSHIFT":
					result = (
						resolve(leftHandSide, visitedWires) >>
						resolve(rightHandSide, visitedWires)
					);
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

const secondVisitedWires = new Map([["b", resolve("a", firstVisitedWires)]]);

console.info(resolve("a", secondVisitedWires));
