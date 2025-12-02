import getInput from "../../../_common/get-input.js";

const input = await getInput();

const letterSigns = new Map(/** @type {const} */ ([["L", -1], ["R", 1]]));

const rotations = input
	.split("\n")
	.filter((line) => line.trim() !== "")
	.map((rotation) => {
		const {
			groups: {
				amount: amountString,
				letter
			} = {
				amount: "0",
				letter: "L"
			}
		} = /** @type {{groups: {amount: `${number}`, letter: "L" | "R"}}} */ (
			/** @type {unknown} */ (
				rotation.match(/^(?<letter>L|R)(?<amount>\d+)$/v)
			)
		);

		const amount = Number(amountString);

		const sign = letterSigns.get(letter) ?? 1;

		return {
			amount,
			sign
		};
	});

export default rotations;
