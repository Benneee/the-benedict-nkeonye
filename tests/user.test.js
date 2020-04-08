// import request from 'supertest';
// import app from '../src/app';
// import User from '../src/models/user.model';
// import { setUpDB } from './fixtures/db';

// beforeEach(() => {
//   setUpDB();
// });

// test('Should register new user', async () => {
//   await request(app)
//     .post('/api/v1/users')
//     .send({
//       name: 'Bill',
//       email: 'bill@aol.com',
//       age: 23,
//       bio: 'ever ready',
//       password: 'Ade561.',
//     })
//     .expect(201);
// });

// test('Should not register user with invalid credentials (name)', async () => {
//   await request(app)
//     .post('/api/v1/users')
//     .send({
//       name: '',
//       email: 'bill@aol.com',
//       age: 23,
//       bio: 'ever ready',
//       password: 'Ade561.',
//     })
//     .expect(400);
// });
