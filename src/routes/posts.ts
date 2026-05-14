import { type FastifyInstance } from 'fastify';

import { posts } from '../schemas';

type GetPostsReturn = {
  id: number;
  title: string;
  body: string;
}[];

const routes = (app: FastifyInstance) => {
  app.get('/posts', async (_, __): Promise<GetPostsReturn> => {
    const response = await app.db.select().from(posts);

    return response;
  });
};

export default routes;
