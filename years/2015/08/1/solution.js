/* eslint-disable no-eval,security/detect-eval-with-expression -- santa isn't a hacker */
import calculateSum from "../../../_common/calculate-sum.js";
import lines from "../_common/lines.js";

const difference = calculateSum(lines.map((line) => line.length - eval(line).length));

console.info(difference);
