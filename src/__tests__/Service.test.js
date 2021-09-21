import supertest from 'supertest';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from '../server';
const request = supertest(app);

dotenv.config();
 
describe('SERVICES test', () => {
  let mongo;
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it('should get the list of services', async () => {
    const response = await request.get('/service/list');
    expect(response.status).toBe(200);
  });

  it('should create a new service', async () => {
    const serviceIndex = Math.random() * 10;
    const service = {
        serviceId: 1,
        name: `newService${serviceIndex}`,
        description: '',
        price: 124,
        content: '',
    };
    const result = await request.post('/service/list').send(service);
    expect(result.status).toBe(200);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});