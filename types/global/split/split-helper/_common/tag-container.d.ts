import tag from "./tag.d.ts";

type TagContainer<Token> = {
	readonly [tag]: Token
};

export default TagContainer;
