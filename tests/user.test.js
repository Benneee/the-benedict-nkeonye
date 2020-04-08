import * as request from 'supertest';
import app from '../src/app';
import User from '../src/models/user.model';

test('Should sign up a new user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'Bill',
      email: 'bill@aol.com',
      age: 23,
      bio: 'ever ready',
      password: 'Ade561.',
    })
    .expect(201);

  // Assert that the DB was changed correctly with new data
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertion about the response object
  expect(resposne.body).toMatchObject({
    user: {
      name: 'Bill',
      email: 'bill@aol.com',
      age: 23,
    },
    token: user.tokens[0].token,
  });

  expect(user.password).not.toBe('Ade561.');
});
