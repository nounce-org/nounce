// database.config.ts
import Dexie from "dexie";

const database = new Dexie("database");
database.version(1).stores({
  posts:
    "++id, title, description, content, url, state, hashContent, contentHash, signature, type, subtype, createdAt, updatedAt",
});

export const postTable = database.table("posts");

export default database;
