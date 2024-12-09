/**
 *
 * @param matrix
 * @example
 */
const transpose = (matrix) => (
	matrix[0]
		.map((value, index) => (
			matrix
				.map((row) => row[index])
		))
);

export default transpose;
