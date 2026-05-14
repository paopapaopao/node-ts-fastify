import Fastify, { type FastifyInstance, type FastifyReply } from 'fastify';

import dbPlugin from './plugins/db';
import envPlugin from './plugins/env';
import { posts } from './schemas';

type GetPostsReturn = {
  id: number;
  title: string;
  body: string;
}[];

const OPTIONS = { logger: true } as const;

const create = async (): Promise<FastifyInstance> => {
  const app = Fastify(OPTIONS);
  await app.register(envPlugin);
  await app.register(dbPlugin);

  app.get('/', (_, reply: FastifyReply): void => {
    reply.send('node-ts-fastify');
  });

  app.get('/posts', async (_, __): Promise<GetPostsReturn> => {
    const response = await app.db.select().from(posts);

    return response;
  });

  return app;
};

export default create;
