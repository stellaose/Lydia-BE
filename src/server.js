import cors from 'cors';
import express from 'express';
import UserRoute from './Routes/UserRoute.js';
import ServiceRoute from './Routes/ServiceRoute.js';
import ReviewRoute from './Routes/ReviewRoute.js';

const app = express(); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/',  (req, res) => {
    res.json({
      status: 'success',
      message: 'Hello World',
    });
  });

app.use('/', UserRoute);
app.use('/', ServiceRoute)
app.use('/', ReviewRoute);

export default app;