import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

type Return = PostgresJsDatabase<Record<string, never>> & {
  $client: postgres.Sql<{}>;
};

export default function create(url: string): Return {
  const client = postgres(url);
  const db = drizzle({ client });

  return db;
}
