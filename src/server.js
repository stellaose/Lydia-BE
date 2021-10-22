import express from 'express';
import cors from 'cors';

import UserRoute from './Routes/UserRoute.js';
import FormRoute from './Routes/FormRoutes.js';
import ServiceRoute from './Routes/index.js';

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
app.use('/form', FormRoute);
app.use('/', ServiceRoute);

export default app;