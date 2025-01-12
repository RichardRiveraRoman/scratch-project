import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

// PORT defined in .env or defaults to 4000;
const PORT = process.env.PORT || 4000;
const app = express();

// Middleware that handles parsing request body
app.use(express.json());

// Routes
app.use('/users');

// Error handler
app.use((err, _req, res) => {
  const defaultErr = {
    log: 'Express error handler caught unkown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj);

  return res.status(errorObj.status).json(errorObj.message);
});

// Atlas database connection
const { MONGO_URI } = process.env;
if (!MONGO_URI) {
  console.error('MONGO_URI not defined in .env file');
  process.exit(1);
}

// MongoClientOptions object to set the Stable API version
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, clientOptions);
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
