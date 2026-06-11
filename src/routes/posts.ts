import { eq } from 'drizzle-orm';
import { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';

import { postsTable } from '../schemas';

export const postsRoutes = (app: FastifyInstance) => {
  app.get('/posts', async (_, reply: FastifyReply) => {
    const posts = await app.db.select().from(postsTable);

    return reply.send({
      success: true,
      message: 'Post read',
      data: posts,
    });
  });

  app.post('/posts', async (request: FastifyRequest, reply: FastifyReply) => {
    const { title, body } = request.body as {
      title: string;
      body: string;
    };

    try {
      const [post] = await app.db.insert(postsTable).values({ title, body }).returning();

      return reply.send({
        success: true,
        message: 'Post created',
        data: post,
      });
    } catch (error) {
      console.error('error', error);

      throw error;
    }
  });

  app.get('/posts/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };

    const [post] = await app.db
      .select()
      .from(postsTable)
      .where(eq(postsTable.id, Number(id)))
      .limit(1);

    if (post === undefined) {
      return reply.status(404).send({
        success: false,
        message: 'Post not found',
        data: null,
      });
    }

    return reply.send({
      success: true,
      message: 'Post read',
      data: post,
    });
  });

  app.put('/posts/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };

    const { title, body } = request.body as {
      title: string;
      body: string;
    };

    const [post] = await app.db
      .update(postsTable)
      .set({ title, body })
      .where(eq(postsTable.id, Number(id)))
      .returning();

    if (post === undefined) {
      return reply.status(404).send({
        success: false,
        message: 'Post not found',
        data: null,
      });
    }

    return reply.send({
      success: true,
      message: 'Post updated',
      data: post,
    });
  });

  app.delete('/posts/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };

    const [post] = await app.db
      .delete(postsTable)
      .where(eq(postsTable.id, Number(id)))
      .returning();

    if (post === undefined) {
      return reply.status(404).send({
        success: false,
        message: 'Post not found',
        data: null,
      });
    }

    return reply.send({
      success: true,
      message: 'Post deleted',
      data: post,
    });
  });
};
