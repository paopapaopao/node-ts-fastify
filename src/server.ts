import build from './app';

const start = async (): Promise<void> => {
  const app = await build();
  const options = { port: app.config.PORT, host: '0.0.0.0' };
  await app.listen(options);
};

start();
