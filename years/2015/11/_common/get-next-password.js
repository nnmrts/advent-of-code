import { base } from "./_common/_exports.js";
import { alphabeticToBase26, base26ToAlphabetic } from "./get-next-password/_exports.js";

/**
 * @param {string} password
 */
const getNextPassword = (password) => {
	let currentPassword = password;

	while (true) {
		currentPassword = base26ToAlphabetic(
			(Number.parseInt(alphabeticToBase26(currentPassword), base) + 1)
				.toString(base)
		);

		const regex = /^(?=.*?(?:(?=ab|bc|cd|de|ef|fg|gh|jk|kl|lm|mn|pq|qr|rs|st|tu|uv|vw|wx|xy|yz).){2,}.)(?=.*?(?<first>[a-z])\k<first>)(?=.*?(?<second>[a-z])(?!\k<first>)\k<second>)(?:[^ilo].)+$/gv;

		if (currentPassword.match(regex) !== null) {
			return currentPassword;
		}
	}
};

export default getNextPassword;
