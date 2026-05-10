import 'fastify';

import type createDb from '../db';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      DATABASE_URL: string;
    };
    db: ReturnType<typeof createDb>;
  }
}
