import getInput from "../../../_common/get-input.js";

const input = await getInput();

const banks = input.trim().split("\n").map((bank) => [...bank].map(Number));

export default banks;
