import { dbPromise, STORE_NAME } from "./db";

export const getCustomers = async ({
  page = 0,
  limit = 30,
  sortConfig = { key: "name", direction: "asc" },
  searchTerm = "",
}) => {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const index = store.index(sortConfig.key);

  const direction = sortConfig?.direction === "asc" ? "next" : "prev";
  let cursor = await index.openCursor(null, direction);

  const results = [];
  const offset = page * limit;
  let skipped = 0;
  const lowerSearch = searchTerm.toLowerCase();

  while (cursor) {
    const customer = cursor.value;

    const isMatch =
      !searchTerm ||
      customer?.name?.toLowerCase()?.includes(lowerSearch) ||
      customer?.email?.toLowerCase()?.includes(lowerSearch) ||
      customer?.phone?.includes(searchTerm);

    if (isMatch) {
      if (skipped < offset) {
        skipped++;
      } else {
        results.push(customer);
      }
    }

    if (results.length >= limit) {
      break;
    }

    cursor = await cursor.continue();
  }

  return results;
};

export const getCustomerCount = async ({ searchTerm = "" }) => {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);

  if (!searchTerm) {
    return store.count();
  }

  let cursor = await store.openCursor();
  let count = 0;
  const lowerSearch = searchTerm?.toLowerCase();

  while (cursor) {
    const customer = cursor.value;
    const isMatch =
      customer?.name?.toLowerCase()?.includes(lowerSearch) ||
      customer?.email?.toLowerCase()?.includes(lowerSearch) ||
      customer?.phone?.includes(searchTerm);

    if (isMatch) {
      count++;
    }

    cursor = await cursor.continue();
  }

  return count;
};
