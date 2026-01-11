import tagSymbol from "./tag-symbol.d.ts";

type TagContainer<Token> = {
	readonly [tagSymbol]: Token
};

export default TagContainer;
