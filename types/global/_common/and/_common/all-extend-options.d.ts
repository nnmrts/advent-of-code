type AllExtendOptions = {

	/**
	 * Consider `never` elements to match the target type only if the target type itself is `never` (or `any`).
	 *
	 * - When set to `true` (default), `never` is _not_ treated as a bottom type, instead, it is treated as a type that matches only itself (or `any`).
	 * - When set to `false`, `never` is treated as a bottom type, and behaves as it normally would.
	 *
	 * @default true
	 */
	strictNever?: boolean
};

export default AllExtendOptions;
