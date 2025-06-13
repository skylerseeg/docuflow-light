/**
================================================================================
| FILE: backend/src/api/documents.js                                           |
|                                                                              |
| This file defines the API routes related to document handling. It uses       |
| Express Router and Multer to manage file uploads and orchestrates the        |
| calls to the AI and Firestore services.                                      |
================================================================================
*/

const express = require('express');
const multer = require('multer');

// Import the service modules
const { processInvoice } = require('../services/gcp-vision');
const { saveDocumentData } = require('../services/firestore');

// --- Initialize Express Router ---
const router = express.Router();

// --- Configure Multer for File Uploads ---
// This configures Multer to handle file uploads and store them in memory as a buffer.
// It also sets a file size limit (e.g., 5MB) to prevent very large uploads.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
});

// --- API Route Definitions ---

/**
 * POST /api/v1/documents/upload
 * Route to handle document uploads. It expects a single file in a 'file' field.
 * This endpoint should be protected by authentication middleware in a real app.
 */
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // 1. Check if a file was uploaded.
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded.' });
    }

    // This would come from your authentication middleware (e.g., from a decoded JWT)
    // For this example, we'll use a placeholder.
    const userId = 'placeholder-user-id'; 

    console.log(`Received file: ${req.file.originalname} for user: ${userId}`);

    // 2. Call the AI service to process the document.
    const extractedData = await processInvoice(req.file.buffer, req.file.mimetype);

    // 3. Save the extracted data to Firestore.
    const documentId = await saveDocumentData(userId, extractedData, req.file.originalname);

    // 4. Send a success response.
    res.status(200).send({
      message: 'File processed and data saved successfully.',
      documentId: documentId,
      extractedData: extractedData,
    });

  } catch (error) {
    console.error('Error in upload route:', error);
    res.status(500).send({ message: 'An internal server error occurred.' });
  }
});

module.exports = router;
