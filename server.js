import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";
import database from "./server/models/user.model.js";
import cors from 'cors';

// CORS configuration

const corsOptions = {
  origin: 'http://localhost:5173', // Allow your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS for preflight requests
  allowedHeaders: ['Content-Type', 'Authorization'], // Include headers you use
  credentials: true, // Allow credentials (cookies, authorization headers)
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors());  // Explicitly handle OPTIONS requests

// Example API route
app.get('/api/concerts', async (req, res) => {
  try {
    const concerts = await database.find();
    res.json(concerts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch concerts' });
  }
});

// Database connection
mongoose.connect(config.mongoUri, {
  // Optional options
}).then(() => {
  console.log("Connected to the database!");
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
  process.exit(1);
});

// Start the server
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.info("Server started on port %s.", config.port);
});
