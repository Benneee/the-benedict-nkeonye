import mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import User from '../../src/models/user.model';
import Post from '../../src/models/posts.model';

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Bill',
  email: 'bill@aol.com',
  age: 23,
  bio: 'ever ready',
  password: 'Ade561.',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: 'Tessy',
  email: 'tessy@aol.com',
  age: 20,
  password: 'theresa1.',
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};

const postOne = {
  _id: new mongoose.Types.ObjectId(),
  title: 'Post One',
  body: 'Lorem likes to ipsum sometimes sha',
  description: 'Lorem something...',
  owner: userOneId,
};

const postTwo = {
  _id: new mongoose.Types.ObjectId(),
  title: 'Post Two',
  body: 'Title for post two',
  description: 'Description for post two',
  owner: userOneId,
};

const postThree = {
  _id: new mongoose.Types.ObjectId(),
  title: 'Post Three',
  body: 'Three for post three',
  description: 'Description for post three',
  owner: userTwoId,
};

const setUpDB = async () => {
  await User.deleteMany();
  await Post.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Post(postOne).save();
  await new Post(postTwo).save();
  await new Post(postThree).save();
};

export default {
  userOne,
  userOneId,
  userTwo,
  userTwoId,
  postOne,
  postTwo,
  postThree,
  setUpDB,
};
