import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres, { type Options, type Sql } from 'postgres';

type Return = PostgresJsDatabase<Record<string, never>> & { $client: Sql<{}> };

const create = (url: string): Return => {
  const options: Options<{}> = { ssl: 'require' };
  const client = postgres(url, options);
  const config = { client };
  const db = drizzle(config);

  return db;
};

export default create;
