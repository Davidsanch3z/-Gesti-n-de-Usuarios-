const request = require('supertest');
const app = require('../src/index');
const mongoose = require('mongoose');
const User = require('../src/models/User');

describe('User API Endpoints', () => {
  const testUser = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'Password123!'
  };
  let token;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send(testUser)
      .expect(201);

    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('_id');
    expect(res.body.email).toBe(testUser.email);
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: testUser.email, password: testUser.password })
      .expect(200);

    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should get user profile with valid token', async () => {
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.email).toBe(testUser.email);
    expect(res.body).toHaveProperty('name');
  });

  it('should not allow profile access without token', async () => {
    await request(app)
      .get('/api/users/profile')
      .expect(401);
  });

});
