import express from 'express';
import './db/db';

// Routes Import
import userRoutes from './routes/user.route';

const { log } = console;

const app = express();
const { PORT } = process.env;

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcome to Benedict Nkeonye's APIS");
});

// Routes
app.use('/api/v1/users', userRoutes); // Sign up

app.listen(PORT, () => {
  log(`Server is running on localhost:${PORT}`);
});

export default app;
