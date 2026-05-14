import { defineConfig } from 'drizzle-kit';

const config = defineConfig({
  dbCredentials: { url: process.env.DATABASE_URL! },
  dialect: 'postgresql',
  schema: './src/schemas',
  out: './src/migrations',
});

export default config;
