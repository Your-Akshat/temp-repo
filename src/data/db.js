import { openDB } from "idb";

const DB_NAME = "doubleTick-customer-data";
const DB_VERSION = 1;
export const STORE_NAME = "doubleTick-customers";

export const INDEX_NAME = "name";
export const INDEX_EMAIL = "email";
export const INDEX_PHONE = "phone";
export const INDEX_SCORE = "score";
export const INDEX_LAST_MESSAGE = "lastMessageAt";

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      const store = db.createObjectStore(STORE_NAME, {
        keyPath: "id",
        autoIncrement: true,
      });

      store.createIndex(INDEX_NAME, "name", { unique: false });
      store.createIndex(INDEX_EMAIL, "email", { unique: false });
      store.createIndex(INDEX_PHONE, "phone", { unique: false });
      store.createIndex(INDEX_SCORE, "score", { unique: false });
      store.createIndex(INDEX_LAST_MESSAGE, "lastMessageAt", { unique: false });
    }
  },
});
