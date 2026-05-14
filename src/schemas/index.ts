import { integer, pgTable, text } from 'drizzle-orm/pg-core';

const postsTable = pgTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  body: text('body').notNull(),
});

export { postsTable };
