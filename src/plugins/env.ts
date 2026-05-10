import fastifyEnv from '@fastify/env';
import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin(async (fastify) => {
  const options = {
    dotenv: true,
    schema: {
      type: 'object',
      required: ['DATABASE_URL'],
      properties: {
        DATABASE_URL: { type: 'string' },
      },
    },
  };

  await fastify.register(fastifyEnv, options);
});
