import fastifyPlugin from 'fastify-plugin';
import { type FastifyInstance } from 'fastify';

import { createDb } from '../db';

export const dbPlugin = fastifyPlugin((fastify: FastifyInstance) => {
  const db = createDb(fastify.config.DATABASE_URL);
  fastify.decorate('db', db);
});
