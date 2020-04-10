import express from 'express';
import cors from 'cors';
import './src/db/db';

// Routes Import
import userRoutes from './src/routes/user.route';
import postRoutes from './src/routes/posts.route';

const app = express();

app.use(cors());

// Options for CORS
app.options('*', cors());

app.get('/', (req, res) => {
  res.send("Welcome to Benedict Nkeonye's APIS");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);

export default app;
