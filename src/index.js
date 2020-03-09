import express from 'express';
import cors from 'cors';
import './db/db';

// Routes Import
import userRoutes from './routes/user.route';
import postRoutes from './routes/posts.route';

const { log } = console;

const app = express();
const { PORT } = process.env;

app.use(cors());

// Options for CORS
app.options('*', cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcome to Benedict Nkeonye's APIS");
});

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);

app.listen(PORT, () => {
  log(`Server is running on localhost:${PORT}`);
});

export default app;
