import getInput from "../../../_common/get-input.js";

const input = await getInput();

const [replacementsPart, molecule] = input.trim().split("\n\n");

const replacements = /** @type {readonly (readonly [string, string])[]} */ (
	/** @type {unknown} */ (
		replacementsPart
			.split("\n")
			.map((replacementString) => replacementString.split(" => "))
	)
);

const instructions = /** @type {const} */ ({
	molecule,
	replacements
});

export default instructions;
