import getInput from "../../../_common/get-input.js";

const input = await getInput();

/**
 * @typedef {"."|"S"|"^"|"|"} ManifoldValue
 */

const manifold = /** @type {readonly (readonly ManifoldValue[])[]} */ (
	input.trim().split("\n").map((row) => [...row])
);

export default manifold;
