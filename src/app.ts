import Fastify, { type FastifyReply } from 'fastify';

import { dbPlugin, envPlugin } from './plugins';
import { postsRoutes } from './routes';

const OPTIONS = { logger: true } as const;

export const createApp = async () => {
  const app = Fastify(OPTIONS);

  await app.register(envPlugin);
  await app.register(dbPlugin);

  await app.register(postsRoutes);

  app.get('/', (_, reply: FastifyReply) => {
    reply.send('node-ts-fastify');
  });

  return app;
};
