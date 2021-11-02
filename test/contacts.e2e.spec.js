const request = require('supertest');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const app = require('../app');
const Contact = require('../model/contact');
const User = require('../model/user');
const { newContact, newUserForRouteContact } = require('./data/data');
const { before } = require('lodash');
require('dotenv').config();

describe('Test route contacts', () => {
  let user, token;
  beforeAll(async () => {
    await db;
    await User.deleteOne({ email: newUserForRouteContact.email });
    user = await User.create(newUserForRouteContact);
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    const issueToken = (payload, secret) => jwt.sign(payload, secret);
    token = issueToken({ id: user._id }, SECRET_KEY);
    await User.updateOne({ _id: user._id }, { token });
  });
  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: newUserForRouteContact.email });
    await mongo.disconnect();
  });

  beforeEach(async () => {
    await Contact.deleteMany({});
  });

  describe('GET request', () => {
    fit('should return status 200 get all contacts', async () => {
      const response = await request(app).get('/api/contacts').set('Authorization', `Bearer ${token}`);
      expect(response.status).toEqual(200);
      expect(response.body).toBeDefined();
      expect(response.body.data.contacts).toBeInstanceOf(Array);
    });

    it('should return status 200 get by ID contact', async () => {
      const contact = await Contact.create({ ...newContact, owner: user._id });
      const response = await request(app).get(`/api/contacts/${contact._id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(200);
      expect(response.body).toBeDefined();
      expect(response.body.data.contact).toHaveProperty('id');
      expect(response.body.data.contact).toHaveProperty('name');
      expect(response.body.data.contact).toHaveProperty('email');
      expect(response.body.data.contact).toHaveProperty('phone');
    });

    it('should return status 404 if contact  not found', async () => {
      const contact = await Contact.create({ ...newContact, owner: user._id });
      const response = await request(app).get(`/api/contacts/${user._id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(404);
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('code');
    });
  });
  describe('POST request', () => {
    it('should return status 201 create contact', async () => {
      const response = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .send(newContact)
        .set('Accept', 'application/json');

      expect(response.status).toEqual(201);
      expect(response.body).toBeDefined();
      console.log(response.body);
    });
  });
});
