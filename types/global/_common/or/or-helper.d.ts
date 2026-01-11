type OrHelper<A extends boolean, B extends boolean> = A extends true
	? true
	: B extends true
		? true
		: false;

export default OrHelper;
