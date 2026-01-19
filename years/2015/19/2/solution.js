import instructions from "../_common/instructions.js";

const {
	molecule,
	replacements
} = instructions;

let minimumSteps = Infinity;

const reversedReplacements = replacements
	.map((replacement) => replacement.toReversed())
	.toReversed();

const target = "e";

const globalTimelines = new Set();

/**
 *
 * @param {Set<string>} timelines
 * @param {number} [step]
 * @returns {Set<string>}
 */
const recurse = (timelines, step = 0) => new Set(
	[...timelines]
		.flatMap((timeline) => {
			if (globalTimelines.has(timeline) || globalTimelines.has(target)) {
				return [];
			}

			if (timeline === target && step < minimumSteps) {
				minimumSteps = step;

				return [];
			}

			globalTimelines.add(timeline);

			const relevantReplacements = reversedReplacements
				.filter(([searchString]) => timeline.includes(searchString));

			const results = new Set(
				relevantReplacements
					.flatMap((replacement) => [timeline.replace(...replacement)])
					.toSorted(({ length: lengthA }, { length: lengthB }) => lengthA - lengthB)
					.slice(0, 2)
			);

			if (results.size === 0 || timeline.length === 1) {
				return [];
			}

			return [
				...recurse(
					results,
					step + 1
				)
			];
		})
);

recurse(new Set([molecule]));

console.info(minimumSteps);
