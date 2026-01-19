/**
 * @template ItemTemplate
 * @param {readonly ItemTemplate[]} permutationOptions
 * @returns {ItemTemplate[][]}
 */
const permute = ([firstOption, ...rest]) => (
	rest.length === 0
		? [[firstOption]]
		: permute(rest)
			.flatMap((smallerPermutation) => [
				...smallerPermutation
					.map((value, index) => [
						...smallerPermutation
							.slice(0, index),
						firstOption,
						...smallerPermutation
							.slice(index)
					]),
				[...smallerPermutation, firstOption]
			])
);

export default permute;
