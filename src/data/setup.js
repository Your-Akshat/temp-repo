import { faker } from "@faker-js/faker";
import { dbPromise, STORE_NAME } from "./db";

const TOTAL_RECORDS = 1000000;
const BATCH_SIZE = 5000;

const createRandomCustomer = () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    score: faker.number.int({ min: 0, max: 100 }),
    lastMessageAt: faker.date.recent({ days: 90 }),
    addedBy: faker.person.fullName(),
    avatar: faker.image.avatar(),
  };
};

export const populateDatabase = async () => {
  const db = await dbPromise;
  const count = await db.count(STORE_NAME);

  if (count >= TOTAL_RECORDS) {
    return;
  }

  const recordRemaining = TOTAL_RECORDS - count;
  let recordsAdded = 0;

  for (let i = 0; i < recordRemaining; i += BATCH_SIZE) {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    const promises = [];
    const batchLimit = Math.min(i + BATCH_SIZE, recordRemaining);

    for (let j = i; j < batchLimit; j++) {
      promises.push(store.add(createRandomCustomer()));
    }

    await Promise.all(promises);

    await tx.done;

    recordsAdded += promises.length;
  }
};
