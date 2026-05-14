import fastifyPlugin from 'fastify-plugin';
import { type FastifyInstance } from 'fastify';

import create from '../db';

const plugIn = (fastify: FastifyInstance): void => {
  const db = create(fastify.config.DATABASE_URL);
  fastify.decorate('db', db);
};

const plugInDb = fastifyPlugin(plugIn);

export default plugInDb;
