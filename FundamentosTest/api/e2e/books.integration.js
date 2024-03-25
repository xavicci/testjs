const request = require('supertest');
const createApp = require('../src/app');
const { generateManyBook } = require('../src/fakes/book.fake');

const mockGetAll = jest.fn();

jest.mock('../src/lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll, create: () => {},
})));
describe('Test for books', () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
  });

  afterAll(async () => {
    server.close();
  });

  describe('test for [GET] /api/v1/books', () => {
    test('should return a list books', () => {
      const fakeBooks = generateManyBook(20);
      mockGetAll.mockResolvedValue(fakeBooks);
      return request(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toEqual(1);
        });
    });
  });
});
