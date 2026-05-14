import Fastify, { type FastifyInstance, type FastifyReply } from 'fastify';

import { dbPlugin, envPlugin } from './plugins';
import { postsRoutes } from './routes';

const OPTIONS = { logger: true } as const;

const create = async (): Promise<FastifyInstance> => {
  const app = Fastify(OPTIONS);

  await app.register(envPlugin);
  await app.register(dbPlugin);

  await app.register(postsRoutes);

  app.get('/', (_, reply: FastifyReply): void => {
    reply.send('node-ts-fastify');
  });

  return app;
};

export default create;
