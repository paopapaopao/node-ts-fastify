import app from './app';

const PORT = 4000;
const port = Number(process.env.PORT) || PORT;

app.listen({ port });
