import { md5 } from "./mine/_exports.js";

const hexDigitsInUint32 = 8;
const base = 16;

/**
 * @param {string} key
 * @param {number} leadingZeros
 * @returns {number}
 */
const mine = (key, leadingZeros) => {
	const keyBytes = new TextEncoder().encode(key);
	const threshold = base ** (hexDigitsInUint32 - leadingZeros);
	let number = 0;
	let numberString = String(number);
	let input = new Uint8Array(keyBytes.length + numberString.length);

	input.set(keyBytes);

	while (true) {
		number += 1;

		numberString = String(number);

		const fullLength = keyBytes.length + numberString.length;

		if (input.length !== fullLength) {
			input = new Uint8Array(fullLength);

			input.set(keyBytes);
		}

		for (let index = 0; index < numberString.length; index++) {
			input[keyBytes.length + index] = /** @type {number} */ (
				numberString.codePointAt(index)
			);
		}

		const hashBuffer = md5(input);
		const view = new DataView(hashBuffer);

		if (view.getUint32(0, false) < threshold) {
			return number;
		}
	}
};

export default mine;
