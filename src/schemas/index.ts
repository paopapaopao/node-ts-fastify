import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const postsTable = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  body: text('body').notNull(),
});
