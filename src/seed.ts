import dotenv from 'dotenv';

import { createDb } from './db';
import { postsTable, recipesTable } from './schemas';

dotenv.config();

const db = createDb(process.env.DATABASE_URL!);

const seedRecipesTable = async () => {
  const response = await fetch('https://dummyjson.com/recipes?limit=0');
  // TODO: Add type
  const data: any = await response.json();

  await db.insert(recipesTable).values(
    // TODO: Add type
    data.recipes.map((recipe: any) => ({
      id: recipe.id,
      image: recipe.image,
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,

      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      difficulty: recipe.difficulty,
      servings: recipe.servings,
      calories: recipe.calories,
      cuisine: recipe.cuisine,
      tags: recipe.tags,
      mealType: recipe.mealType,

      userId: recipe.userId,
      reviewCount: recipe.reviewCount,
      rating: recipe.rating,
    })),
  );

  console.log('Seeding recipes table done');
};

const seed = async () => {
  const response = await fetch(
    'https://dummyjson.com/posts?limit=0&select=id,title,body',
  );

  // TODO: Add type
  const data: any = await response.json();

  await db.insert(postsTable).values(
    // TODO: Add type
    data.posts.map((post: any) => ({
      id: post.id,
      title: post.title,
      body: post.body,
    })),
  );

  await seedRecipesTable();

  console.log('Seeding done');
};

seed();
