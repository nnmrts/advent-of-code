/**
 * @template {readonly (readonly unknown[])[]} MatrixTemplate
 * @template [RowTemplate=MatrixTemplate["length"] extends 0 ? [] : MatrixTemplate[0]]
 * @typedef {(
 * {
 * 	[X in keyof RowTemplate]: {
 * 		[Y in keyof MatrixTemplate]: MatrixTemplate[Y][X & keyof MatrixTemplate[Y]]
 * 	}
 * }
 * )} Transpose
 */
