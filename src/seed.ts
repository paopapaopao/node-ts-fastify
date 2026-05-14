import create from './db';
import { postsTable } from './schemas';

const db = create(process.env.DATABASE_URL!);

const seed = async () => {
  const response = await fetch(
    'https://dummyjson.com/posts?limit=10&select=id,title,body',
  );

  const data = await response.json();

  await db.insert(postsTable).values(
    data.posts.map((post: any) => ({
      id: post.id,
      title: post.title,
      body: post.body,
    })),
  );

  console.log('Seeding done');
};

seed();
