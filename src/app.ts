import Fastify, { type FastifyInstance, type FastifyReply } from 'fastify';

import dbPlugin from './plugins/db';
import envPlugin from './plugins/env';

const OPTIONS = { logger: true } as const;

const create = async (): Promise<FastifyInstance> => {
  const app = Fastify(OPTIONS);
  await app.register(envPlugin);
  await app.register(dbPlugin);

  app.get('/', (_, reply: FastifyReply): void => {
    reply.send('node-ts-fastify');
  });

  return app;
};

export default create;
