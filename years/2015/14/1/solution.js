import maximumSeconds from "../_common/maximum-seconds.js";
import reindeerGroup from "../_common/reindeer-group.js";

/**
 * @param {reindeerGroup[number]} reindeer
 */
const getDistance = ({
	flySpeed,
	flyTime,
	restTime
}) => {
	let currentSecond = 0;
	let distance = 0;

	while (currentSecond <= maximumSeconds) {
		const actualFlyTime = Math.min(maximumSeconds - currentSecond, flyTime);

		currentSecond += actualFlyTime;

		distance += actualFlyTime * flySpeed;

		currentSecond += restTime;
	}

	return distance;
};

const [furthestDistance] = reindeerGroup
	.map(getDistance)
	.toSorted((distanceA, distanceB) => distanceB - distanceA);

console.info(furthestDistance);
