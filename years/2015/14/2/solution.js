import maximumSeconds from "../_common/maximum-seconds.js";
import reindeerGroup from "../_common/reindeer-group.js";

const [highestPoints] = Array.from(
	{ length: maximumSeconds + 1 },
	(empty, currentSecond) => currentSecond
)
	.reduce(
		(previousReindeerGroup) => [
			...Map.groupBy(
				previousReindeerGroup
					.map(({
						currentDistance,
						currentFlyTime,
						currentRestTime,
						flySpeed,
						flyTime,
						restTime,
						...rest
					}) => {
						let actualFlyTime = currentFlyTime;
						let actualRestTime = currentRestTime;

						if (actualRestTime === restTime) {
							actualFlyTime = 0;
							actualRestTime = 0;
						}

						const resting = actualFlyTime === flyTime;

						return {
							...rest,
							currentDistance: resting ? currentDistance : currentDistance + flySpeed,
							currentFlyTime: resting ? actualFlyTime : actualFlyTime + 1,
							currentRestTime: resting ? actualRestTime + 1 : actualRestTime,
							flySpeed,
							flyTime,
							restTime
						};
					}),
				({ currentDistance }) => currentDistance
			)
		]
			.toSorted(([distanceA], [distanceB]) => distanceB - distanceA)
			.flatMap(([distance, innerReindeerGroup], index) => (
				index === 0
					? innerReindeerGroup.map(({ currentPoints, ...rest }) => ({
						...rest,
						currentPoints: currentPoints + 1
					}))
					: innerReindeerGroup
			)),
		reindeerGroup.map((reindeer) => ({
			...reindeer,
			currentDistance: 0,
			currentFlyTime: 0,
			currentPoints: 0,
			currentRestTime: 0
		}))
	)
	.map(({ currentPoints }) => currentPoints)
	.toSorted((pointsA, pointsB) => pointsB - pointsA);

console.info(highestPoints);
