import pairsWithDistance from "../_common/pairs-with-distance.js";

const uniqueLocations = [...(new Set(pairsWithDistance.flatMap(({ locations }) => locations)))];

export default uniqueLocations;
