import fastifyEnv from '@fastify/env';
import fastifyPlugin from 'fastify-plugin';
import { type FastifyInstance } from 'fastify';

const OPTIONS = {
  dotenv: true,
  schema: {
    type: 'object',
    required: ['DATABASE_URL'],
    properties: {
      DATABASE_URL: { type: 'string' },
      PORT: { type: 'number', default: 4000 },
    },
  },
} as const;

export const envPlugin = fastifyPlugin(async (fastify: FastifyInstance) => {
  await fastify.register(fastifyEnv, OPTIONS);
});
