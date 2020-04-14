const supertest = require('supertest');
const config = require('./config');
const helpers = require('./helpers');
const { cloneDeep } = require('lodash');
const Timeout = require('await-timeout');

// Initiate the supertest client
const request = supertest.agent(config.url);

// Construct a valid post to the ticket endpoint
const validPost = {
	'name':'justin',
	'email':'just@in.com',
	'password':'12husksnyhs0'
}

// Get
describe('GET /users', () => {
   test('should return a 405', async () => {
      const response = await request.get('/users');
      expect(response.status).toEqual(405);
   });
});

// POST
describe('POST /users', () => {

   // No Payload sent
   test('Should return a 400 if no payload was sent', async () => {
      const { status } = await request.post('/users');
      expect(status).toEqual(400);
   });

   // No payload send
   test('Should return an error message if no payload was send', async () => {
      const { body, status } = await request.post('/users');
      expect(status).toEqual(400);
      expect(body).toEqual(expect.objectContaining({
         'error': {
            'type': 'payload',
            'timestamp': expect.any(Number),
            'messages': [
               expect.any(String)
            ],
            'key': expect.any(String)
         }
      }))
   });

   // Payload is missing an email address
   test('should show an error message if payload is missing an email address', async () => {
      let payload = cloneDeep(validPost);
      delete payload.email;
      const {body,status} = await request.post('/users').send(payload);
      expect(status).toEqual(400);
      expect(body).toEqual(expect.objectContaining({
         'error': {
            'type': 'payload',
            'timestamp': expect.any(Number),
            'messages': [
               expect.any(String)
            ],
            'key': 'email'
         }
      }));
   });

});