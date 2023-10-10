export enum PostState {
  DRAFT = "draft",
  FINALIZED = "finalized",
  UPLOADED = "uploaded",
  SIGNED = "signed",
  PUBLISHED = "published",
}

export enum PostType {
  ARTICLE = "article",
  EVENT = "event",
  EXTERNAL = "external",
  CONTRACT = "contract",
  MEDIA = "media",
}

export enum PostSubType {
  TEXT = "text",
  MARKDOWN = "markdown",
  ICS = "ics",
  JSON_LD = "json-ld",
  WEBSITE = "website",
  SNAPSHOT = "snapshot",
  ENS = "ens",
  ERC721 = "erc721",
  ERC1155 = "erc1155",
  ERC20 = "erc20",
  IMAGE = "image",
  VIDEO = "video",
  PDF = "pdf",
}

export interface IPost {
  id?: number;
  title: string;
  description?: string;
  content?: string;
  url?: string;
  state: PostState;
  hashContent?: boolean;
  contentHash?: string;
  signature?: string; // Assuming bytes32 is represented as a string here
  type: PostType;
  subtype?: PostSubType;
  createdAt?: Date;
  updatedAt?: Date;
}
