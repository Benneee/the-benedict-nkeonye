import mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import User from '../../src/models/user.model';
import Post from '../../src/models/posts.model';

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Bill',
  email: 'bill@AudioListener.com',
  age: 23,
  bio: 'ever ready',
  password: 'Ade561.',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

export default {
  userOne,
};
