import { eq } from 'drizzle-orm';
import { type FastifyInstance, type FastifyRequest } from 'fastify';

import { postsTable } from '../schemas';

export const postsRoutes = (app: FastifyInstance) => {
  app.get('/posts', async (_, __) => {
    const response = await app.db.select().from(postsTable);

    return response;
  });

  app.get('/posts/:id', async (request: FastifyRequest, __) => {
    const { id } = request.params as { id: string };

    const [response] = await app.db
      .select()
      .from(postsTable)
      .where(eq(postsTable.id, Number(id)))
      .limit(1);

    return response;
  });
};
