import 'fastify';

import create from '../db';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      DATABASE_URL: string;
      PORT: number;
    };
    db: ReturnType<typeof create>;
  }
}
