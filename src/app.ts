import Fastify, { FastifyReply } from 'fastify';

import dbPlugin from './plugins/db';
import envPlugin from './plugins/env';

export default async function buildApp() {
  const app = Fastify({ logger: true });

  await app.register(envPlugin);
  await app.register(dbPlugin);

  app.get('/', (_, reply: FastifyReply): void => {
    reply.send('node-ts-fastify');
  });

  return app;
}
