import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';

// PORT defined in .env or defaults to 4000
const PORT = process.env.PORT || 4000;
const app = express();

// 1) Core middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2) Routes
app.use('/users', userRoutes);

// Middleware: Serve static files
// app.use(express.static(path.resolve(__dirname, '../dist')));

// Wildcard route for SPA (React frontend)
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../dist/index.html'));
// });

// 3) 404 or “Not Found” Handler
app.use((req, res, next) => {
  const error = new Error('Route Not Found');
  error.status = 404;
  next(error);
});

// 4) Error handler (keep it last)
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj);

  return res.status(errorObj.status).json(errorObj.message);
});

// MongoClientOptions object to set the Stable API version
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    console.log('Successfully connected to MongoDB!');

    // Start the server only after the DB connection is successful
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    // If DB connection fails, log the error and exit
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

// gracefully shutdown server when you CTRL-C
process.on('SIGINT', async () => {
  console.log('Received SIGINT. Graceful shutdown start');
  await mongoose.disconnect();
  process.exit(0);
});

startServer();
