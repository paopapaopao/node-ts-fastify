import create from './app';

const start = async (): Promise<void> => {
  const app = await create();
  const port = Number(process.env.PORT ?? 4000);
  const options = { host: '0.0.0.0', port };
  await app.listen(options);
};

start();
