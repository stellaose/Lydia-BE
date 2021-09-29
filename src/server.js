import cors from 'cors';
import express from 'express';
import UserRoute from './Routes/UserRoute.js';
import ServiceRoute from './Routes/ServiceRoute.js'

const app = express(); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin','*');
  next();
})

app.get('/',  (req, res) => {
    res.json({
      status: 'success',
      message: 'Hello World',
    });
  });

app.use('/api', UserRoute);
app.use('/service', ServiceRoute);

export default app;