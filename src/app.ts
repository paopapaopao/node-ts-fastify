import Fastify, { FastifyReply } from 'fastify';

const app = Fastify({ logger: true });

app.get('/', (_, reply: FastifyReply): void => {
  reply.send('node-ts-fastify');
});

export default app;
