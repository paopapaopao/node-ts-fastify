import Fastify, { type FastifyReply } from 'fastify';

import { corsPlugin, dbPlugin, envPlugin } from './plugins';
import { postsRoutes, recipesRoutes } from './routes';

const OPTIONS = { logger: true } as const;

export const createApp = async () => {
  const app = Fastify(OPTIONS);

  await app.register(envPlugin);
  await app.register(dbPlugin);
  await app.register(corsPlugin);

  await app.register(postsRoutes);
  await app.register(recipesRoutes);

  app.get('/', (_, reply: FastifyReply) => {
    reply.send('node-ts-fastify');
  });

  return app;
};
