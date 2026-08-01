import { numeric, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const postsTable = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  body: text('body').notNull(),
});

export const recipesTable = pgTable('recipes', {
  id: serial('id').primaryKey(),
  image: text('image').notNull(),
  name: text('name').notNull(),
  ingredients: text('ingredients').array().notNull(),
  instructions: text('instructions').array().notNull(),

  // In minutes
  prepTime: numeric('prep_time'),
  // In minutes
  cookTime: numeric('cook_time'),
  difficulty: text('difficulty'),
  servings: numeric('servings'),
  // Per serving
  calories: numeric('calories'),
  cuisine: text('cuisine'),
  tags: text('tags').array(),
  mealType: text('meal_type').array(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),

  userId: numeric('user_id'),
  reviewCount: numeric('review_count'),
  rating: numeric('rating'),
});
