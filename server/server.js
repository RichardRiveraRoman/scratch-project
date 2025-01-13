import 'dotenv/config';
import cors from 'cors';
// import { fileURLToPath } from 'url';
import express from 'express';
// import path from 'path';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import exerciseRoutes from './routes/exerciseRoutes.js';

// PORT defined in .env or defaults to 4000
const PORT = process.env.PORT || 4000;

// OAuth Client Credentials
// Note: For Vite, CLIENT_ID should be something like process.env.VITE_CLIENT_ID
const CLIENT_ID = process.env.VITE_CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/exercise', exerciseRoutes);
app.post('/api/login', (_req, res) => {
  console.log('in login');

  // const { username, password } = req.body;
  res.status(200).json({ message: 'Login successful' });
});

// Route to exchange GitHub OAuth code for an access token
app.get('/getAccessToken', async (req, res) => {
  // Log the 'code' query parameter received from the client
  console.log('Received OAuth code:', req.query.code);

  // Build the query string for GitHub token exchange
  const params =
    '?client_id=' +
    CLIENT_ID +
    '&client_secret=' +
    CLIENT_SECRET +
    '&code=' +
    req.query.code;

  await fetch('https://github.com/login/oauth/access_token' + params, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      // Parse the JSON response from GitHub
      return response.json();
    })
    .then((data) => {
      // Log the access token response to see what GitHub returned
      console.log('Access token response from GitHub:', data);
      // Send the same data back to the client as JSON
      res.json(data);
    })
    .catch((err) => {
      // Log any error that occurred during the fetch
      console.log('Error retrieving access token:', err);
    });
});

// Route to fetch user data from GitHub using the access token
app.get('/getUserData', async (req, res) => {
  // This is where we get the Authorization header: Bearer YOUR_ACCESS_TOKEN
  const authorizationHeader = req.get('Authorization');
  console.log('Authorization header:', authorizationHeader);

  await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      // Forward the Authorization header to GitHub
      Authorization: authorizationHeader,
    },
  })
    .then((response) => {
      // Parse the JSON response containing user data
      return response.json();
    })
    .then((data) => {
      // Log the user's GitHub profile information
      console.log('GitHub user data:', data);
      // Send that data back to the client
      res.json(data);
    })
    .catch((err) => {
      // Log any error that occurred while fetching user data
      console.log('Error retrieving user data:', err);
    });
});

// 404 or “Not Found” Handler
app.use((_req, _res, next) => {
  const error = new Error('Route Not Found');
  error.status = 404;
  next(error);
});

// Error handler (Note: the signature is usually (err, req, res, next))
app.use((err, _req, res) => {
  // Default error object
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  // Log the error object
  console.log('Error object:', errorObj);

  return res.status(errorObj.status).json(errorObj.message);
});

// MongoDB connection string from .env
const MONGO_URI =
  'mongodb+srv://somayeh:codesmith123@cluster0.ykuif.mongodb.net/scratch-project?retryWrites=true&w=majority';
if (!MONGO_URI) {
  console.error(MONGO_URI);
  process.exit(1);
}

// MongoClientOptions object to set the Stable API version
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

// Start the server after connecting to MongoDB
async function startServer() {
  try {
    // Attempt to connect to MongoDB
    await mongoose.connect(MONGO_URI, clientOptions);
    console.log('Successfully connected to MongoDB!');

    // If DB connection is successful, start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    // If DB connection fails, log the error and exit
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

// Gracefully shut down server when you CTRL-C
process.on('SIGINT', async () => {
  console.log('Received SIGINT. Graceful shutdown start');
  await mongoose.disconnect();
  process.exit(0);
});

// Initiate the startup sequence
startServer();
