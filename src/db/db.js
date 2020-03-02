import mongoose from 'mongoose';

const { log } = console;

const url = process.env.MONGODB_URL;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => log('Connected to MongoDB'))
  .catch((error) => {
    log(error);
  });
