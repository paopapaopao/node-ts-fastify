import { desc, eq, lt } from 'drizzle-orm';
import {
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
} from 'fastify';

import { postsTable } from '../schemas';

const DEFAULT_POSTS_LIMIT = 10;
const MAX_POSTS_LIMIT = 50;

const parsePositiveInteger = (value: string | undefined) => {
  if (value === undefined) {
    return undefined;
  }

  const number = Number(value);

  if (!Number.isInteger(number) || number < 1) {
    return undefined;
  }

  return number;
};

export const postsRoutes = (app: FastifyInstance) => {
  app.get('/posts', async (request: FastifyRequest, reply: FastifyReply) => {
    const { cursor, limit } = request.query as {
      cursor?: string;
      limit?: string;
    };

    const cursorId = parsePositiveInteger(cursor);
    const requestedLimit = parsePositiveInteger(limit) ?? DEFAULT_POSTS_LIMIT;
    const pageSize = Math.min(requestedLimit, MAX_POSTS_LIMIT);

    const posts =
      cursorId === undefined
        ? await app.db
            .select()
            .from(postsTable)
            .orderBy(desc(postsTable.id))
            .limit(pageSize + 1)
        : await app.db
            .select()
            .from(postsTable)
            .where(lt(postsTable.id, cursorId))
            .orderBy(desc(postsTable.id))
            .limit(pageSize + 1);

    const hasNextPage = posts.length > pageSize;
    const items = hasNextPage ? posts.slice(0, pageSize) : posts;
    const nextCursor = hasNextPage
      ? (items[items.length - 1]?.id ?? null)
      : null;

    return reply.send({
      success: true,
      message: 'Post read',
      data: {
        posts: items,
        nextCursor,
        hasNextPage,
      },
    });
  });

  app.post('/posts', async (request: FastifyRequest, reply: FastifyReply) => {
    const { title, body } = request.body as {
      title: string;
      body: string;
    };

    try {
      const [post] = await app.db
        .insert(postsTable)
        .values({ title, body })
        .returning();

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

  app.get(
    '/posts/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
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
    },
  );

  app.put(
    '/posts/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
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
    },
  );

  app.delete(
    '/posts/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
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
    },
  );
};
