import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const createDb = (url: string) => {
  const client = postgres(url);
  const config = { client };
  const db = drizzle(config);

  return db;
};
