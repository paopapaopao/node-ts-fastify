import buildApp from './app';

const PORT = 4000;
const port = Number(process.env.PORT) || PORT;

async function start() {
  const app = await buildApp();

  await app.listen({ port, host: '0.0.0.0' });
}

start();
