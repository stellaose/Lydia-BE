import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const databaseConnection = {
    getConnect: () => {
        mongoose
          .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          .then(() => console.log('connected successfully'))
          .catch((err) => console.log(err.message));
    }
}

export default databaseConnection;