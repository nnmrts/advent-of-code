type IsStringLiteralHelper<S> = S extends string
	? {} extends Record<S, never>
		? false
		: true
	: false;

export default IsStringLiteralHelper;
