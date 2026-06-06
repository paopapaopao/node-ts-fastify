import { type FastifyInstance } from 'fastify';

import { postsTable } from '../schemas';

export const postsRoutes = (app: FastifyInstance) => {
  app.get('/posts', async (_, __) => {
    const response = await app.db.select().from(postsTable);

    return response;
  });
};
