import fastifyCors from '@fastify/cors';
import fastifyPlugin from 'fastify-plugin';
import { type FastifyInstance } from 'fastify';

const OPTIONS = {
  origin: true,
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: false,
};

export const corsPlugin = fastifyPlugin(async (fastify: FastifyInstance) => {
  await fastify.register(fastifyCors, OPTIONS);
});
