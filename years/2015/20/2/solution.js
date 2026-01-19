import calculateSum from "../../../_common/calculate-sum.js";
import getDivisors from "../_common/get-divisors.js";
import minimumNumberOfPresents from "../_common/minimum-number-of-presents.js";

let houseNumber = 1;

let numberOfPresents = 0;

while (numberOfPresents < minimumNumberOfPresents) {
	// need to keep track of count of each individual divisor globally, and filter it out if occurred more often then 50 times
	numberOfPresents = calculateSum([...getDivisors(houseNumber)]) * 11;

	console.log(houseNumber);
	houseNumber += 1;
}

console.info(houseNumber - 1);
