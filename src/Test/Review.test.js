import supertest from 'supertest';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from '../server';
const request = supertest(app);

dotenv.config();
 
describe('  REVIEW test', () => {
  let mongo;
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it('should get the list of reviews', async () => {
    const response = await request.get('/service/reviews');
    expect(response.status).toBe(200);
  });

  it('should create a new review', async () => {
    const reviews = {
        author: '',
        rating: 4,
        title: '',
        comment: '',
    };
    const result = await request.post('/service/:serviceId/reviews').send(reviews);
    expect(result.status).toBe(200);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});