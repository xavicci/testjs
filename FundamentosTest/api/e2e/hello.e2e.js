const request = require('supertest');

const createApp = require('../src/app');

describe('Test for hello endPoint', () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
  });

  afterAll(async () => {
    server.close();
  });

  describe('test for [GET] /', () => {
    test('should return "Hello World!"', () => request(app)
      .get('/')
      .expect(200)
      .then((res) => {
        expect(res.text).toEqual('Hello World!');
      }));
  });
});
