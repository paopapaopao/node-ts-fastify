import dotenv from 'dotenv';

import { createDb } from './db';
import { postsTable } from './schemas';

dotenv.config();

const db = createDb(process.env.DATABASE_URL!);

const seed = async () => {
  const response = await fetch('https://dummyjson.com/posts?limit=32&select=id,title,body');

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

  console.log('Seeding done');
};

seed();
