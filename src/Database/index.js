import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@lydia.tcjkl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const databaseConnection = {
    getConnect: () => {
        mongoose
          .connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
          })
          .then(() => console.log('connected successfully'))
          .catch((err) => console.log(err.message));
    }
}

export default databaseConnection;