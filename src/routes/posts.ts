import { eq } from 'drizzle-orm';
import { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';

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
    const { title, body } = request.body as {
      title: string;
      body: string;
    };

    try {
      const [post] = await app.db.insert(postsTable).values({ title, body }).returning();

      return post;
    } catch (error) {
      console.error('error', error);

      throw error;
    }
  });

  app.put('/posts/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };

    const { title, body } = request.body as {
      title: string;
      body: string;
    };

    try {
      const [post] = await app.db
        .update(postsTable)
        .set({ title, body })
        .where(eq(postsTable.id, Number(id)))
        .returning();

      if (!post) {
        return reply.status(404).send({ message: 'Post not found' });
      }

      return post;
    } catch (error) {
      console.error('error', error);

      throw error;
    }
  });

  app.delete('/posts/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };

    const [post] = await app.db
      .delete(postsTable)
      .where(eq(postsTable.id, Number(id)))
      .returning();

    if (!post) {
      return reply.status(404).send({ message: 'Post not found' });
    }

    return {
      message: 'Post deleted successfully',
      post: post,
    };
  });
};
