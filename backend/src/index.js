// backend/src/index.js

const express = require('express');
const cors = require('cors');

// Import API routes
// const documentRoutes = require('./api/documents');

const app = express();

// --- Middleware ---
// Enable CORS for all routes - configure for production with a specific origin
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


// --- API Routes ---
// Mount the document processing routes
// app.use('/api/v1/documents', documentRoutes);


// --- Health Check Route ---
// A simple route to confirm the server is running
app.get('/', (req, res) => {
  res.status(200).send('DocuFlow Lite Backend is running!');
});

// --- Server Initialization ---
// Cloud Run provides the PORT environment variable
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
