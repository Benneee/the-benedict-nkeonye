import express from 'express';

const { log } = console;

const app = express();
const { PORT } = process.env;

app.get('/', (req, res) => {
  res.send("Welcome to Benedict Nkeonye's APIS");
});

app.listen(PORT, () => {
  log(`Server is running on localhost:${PORT}`);
});
