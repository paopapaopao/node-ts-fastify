import create from './app';

const start = async (): Promise<void> => {
  const app = await create();
  const options = { host: '0.0.0.0', port: app.config.PORT };
  await app.listen(options);
};

start();
