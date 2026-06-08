import { eq } from 'drizzle-orm';
import { type FastifyInstance, type FastifyRequest } from 'fastify';

import { postsTable } from '../schemas';

export const postsRoutes = (app: FastifyInstance) => {
  app.get('/posts', async (_, __) => {
    const posts = await app.db.select().from(postsTable);

    return posts;
  });

  app.get('/posts/:id', async (request: FastifyRequest, __) => {
    const { id } = request.params as { id: string };

    const [post] = await app.db
      .select()
      .from(postsTable)
      .where(eq(postsTable.id, Number(id)))
      .limit(1);

    return post;
  });

  app.post('/posts', async (request: FastifyRequest) => {
    try {
      const { title, body } = request.body as {
        title: string;
        body: string;
      };

      const [post] = await app.db.insert(postsTable).values({ title, body }).returning();

      return post;
    } catch (error) {
      console.error('error', error);

      throw error;
    }
  });
};
