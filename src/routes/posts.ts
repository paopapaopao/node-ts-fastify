import { type FastifyInstance } from 'fastify';

import { postsTable } from '../schemas';

type GetPostsReturn = {
  id: number;
  title: string;
  body: string;
}[];

const postsRoutes = (app: FastifyInstance): void => {
  app.get('/posts', async (_, __): Promise<GetPostsReturn> => {
    const response = await app.db.select().from(postsTable);

    return response;
  });
};

export default postsRoutes;
