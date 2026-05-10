import Fastify, {
  type FastifyBaseLogger,
  type FastifyInstance,
  type FastifyReply,
  type FastifyTypeProviderDefault,
} from 'fastify';
import {
  type IncomingMessage,
  type Server,
  type ServerResponse,
} from 'node:http';

import dbPlugin from './plugins/db';
import envPlugin from './plugins/env';

type Return = FastifyInstance<
  Server<typeof IncomingMessage, typeof ServerResponse>,
  IncomingMessage,
  ServerResponse<IncomingMessage>,
  FastifyBaseLogger,
  FastifyTypeProviderDefault
>;

const OPTIONS = { logger: true } as const;

const build = async (): Promise<Return> => {
  const app = Fastify(OPTIONS);
  await app.register(envPlugin);
  await app.register(dbPlugin);

  app.get('/', (_, reply: FastifyReply): void => {
    reply.send('node-ts-fastify');
  });

  return app;
};

export default build;
