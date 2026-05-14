import fastifyPlugin from 'fastify-plugin';
import { type FastifyInstance } from 'fastify';

import create from '../db';

const dbPlugin = fastifyPlugin((fastify: FastifyInstance): void => {
  const db = create(fastify.config.DATABASE_URL);
  fastify.decorate('db', db);
});

export default dbPlugin;
