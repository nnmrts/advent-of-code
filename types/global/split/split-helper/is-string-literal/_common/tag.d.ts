import TagContainer from "../../_common/tag-container.d.ts";

type Tag<Token extends PropertyKey, TagMetadata> = TagContainer<{ [K in Token]: TagMetadata }>;

export default Tag;
