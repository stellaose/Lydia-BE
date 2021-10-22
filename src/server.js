import express from 'express';
import cors from 'cors';

import UserRoute from './Routes/UserRoute.js';
import ServiceRoute from './Routes/ServiceRoute.js';
import FormRoute from './Routes/FormRoutes.js';

const app = express(); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/',  (req, res) => {
    res.json({
      status: 'success',
      message: 'Hello World',
    });
});


app.use('/user', UserRoute);
app.use('/service', ServiceRoute);
app.use('/form', FormRoute);

export default app;