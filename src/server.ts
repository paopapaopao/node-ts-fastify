import { createApp } from './app';

const start = async () => {
  const app = await createApp();
  const port = Number(process.env.PORT ?? 4000);
  const options = { host: '0.0.0.0', port };
  await app.listen(options);
};

start();
