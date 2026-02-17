import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

const { MONGODB_URI, PORT = 3000 } = process.env;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error(error.message);
    process.exit(1);
  });


