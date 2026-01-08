import calculateSum from "../../../_common/calculate-sum.js";

import { pairsWithDistance } from "./_common/_exports.js";
import {
	permute,
	uniqueLocations
} from "./sorted-path-distances/_exports.js";

const sortedPathDistances = permute(uniqueLocations)
	.map((path) => calculateSum(
		path
			.map((location, index) => {
				const locationAfter = path[index + 1];

				if (locationAfter === undefined) {
					return 0;
				}

				const pair = pairsWithDistance
					.find(({ locations }) => (
						locations.includes(location) &&
						locations.includes(locationAfter)
					));

				if (pair === undefined) {
					throw new Error(`pair ${location} & ${locationAfter} not found`);
				}

				return pair?.distance;
			})
	))
	.toSorted((distanceA, distanceB) => distanceA - distanceB);

export default sortedPathDistances;
