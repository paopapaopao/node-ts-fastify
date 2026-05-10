import fastifyPlugin from 'fastify-plugin';

import create from '../db';

export default fastifyPlugin(async (fastify) => {
  const db = create(fastify.config.DATABASE_URL);

  fastify.decorate('db', db);
});
