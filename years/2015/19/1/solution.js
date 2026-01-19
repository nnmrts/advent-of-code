import instructions from "../_common/instructions.js";

import { replaceAllSeparately } from "./solution/_exports.js";

const {
	molecule,
	replacements
} = instructions;

const distinctMolecules = new Set();

for (const replacement of replacements) {
	const results = replaceAllSeparately(molecule, replacement);

	for (const result of results) {
		distinctMolecules.add(result);
	}
}

console.info(distinctMolecules.size);
