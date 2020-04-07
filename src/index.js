import app from './app';

const { PORT } = process.env;
const { log } = console;

app.listen(PORT, () => {
  log(`Server is running on localhost:${PORT}`);
});
