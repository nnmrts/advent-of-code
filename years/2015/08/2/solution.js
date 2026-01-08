import calculateSum from "../../../_common/calculate-sum.js";
import lines from "../_common/lines.js";

const difference = calculateSum(lines.map((line) => JSON.stringify(line).length - line.length));

console.info(difference);
