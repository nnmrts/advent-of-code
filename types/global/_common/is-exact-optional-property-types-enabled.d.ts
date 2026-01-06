/**
 * Indicates the value of `exactOptionalPropertyTypes` compiler option.
 */
type IsExactOptionalPropertyTypesEnabled = [(string | undefined)?] extends [string?]
	? false
	: true;

export default IsExactOptionalPropertyTypesEnabled;
