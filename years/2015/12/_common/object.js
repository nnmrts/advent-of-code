import getInput from "../../../_common/get-input.js";

/**
 * @typedef {`"${string}"`} InputLine
 */

const input = await getInput();

const object = JSON.parse(input.trim());

export default object;
