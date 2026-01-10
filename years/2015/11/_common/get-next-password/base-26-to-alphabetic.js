import { convertDecimalToLetter } from "./base-26-to-alphabetic/_exports.js";

/**
 * @param {string} base26
 */
const base26ToAlphabetic = (base26) => [...base26].map((digit) => convertDecimalToLetter(Number.parseInt(digit, 26))).join("");

export default base26ToAlphabetic;
