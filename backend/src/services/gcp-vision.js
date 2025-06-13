/*
================================================================================
| FILE: backend/src/services/gcp-vision.js                                     |
|                                                                              |
| NOTE: This file handles the interaction with Google's AI. While named        |
| 'gcp-vision.js', it uses the more powerful Document AI service, which is     |
| specifically trained to understand documents like invoices. This is Option B |
| from the report and provides much higher accuracy for the MVP.               |
================================================================================
*/

// Import the Google Cloud Document AI client library
const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1;

// --- Configuration ---
// These should be stored in environment variables, not hard-coded.
const GcpProjectId = process.env.GCP_PROJECT_ID; // Your Google Cloud project ID
const GcpLocation = 'us'; // The location of your Document AI processor (e.g., 'us' or 'eu')
const GcpProcessorId = process.env.PROCESSOR_ID; // The ID of your specific Document AI processor

// --- Initialize the AI Client ---
// Creates a new client to connect to the Document AI service.
const aiClient = new DocumentProcessorServiceClient();

/**
 * Processes an invoice document using Google Cloud Document AI.
 * @param {Buffer} fileBuffer The raw file buffer of the document to process.
 * @param {string} mimeType The MIME type of the file (e.g., 'application/pdf').
 * @returns {Promise<object>} A promise that resolves to an object containing the extracted data.
 */
async function processInvoice(fileBuffer, mimeType) {
  // The full resource name of the processor, e.g.:
  // `projects/project-id/locations/location/processors/processor-id`
  const name = `projects/${GcpProjectId}/locations/${GcpLocation}/processors/${GcpProcessorId}`;

  // Convert the file buffer to a base64-encoded string.
  const encodedImage = fileBuffer.toString('base64');

  // Create the request object to send to the Document AI API.
  const request = {
    name,
    rawDocument: {
      content: encodedImage,
      mimeType,
    },
  };

  try {
    // Send the request to the Document AI service.
    const [result] = await aiClient.processDocument(request);
    const { document } = result;

    console.log('Document AI processing complete.');

    // --- Data Extraction Logic ---
    // The response contains a complex object with all detected entities.
    // This example extracts a few common fields from an invoice.
    const extractedData = {};
    const { entities } = document;

    // Loop through all found entities to find the ones we want.
    for (const entity of entities) {
      // The 'type' field identifies what the entity is (e.g., 'total_amount').
      // The 'mentionText' is the actual text found in the document.
      switch (entity.type) {
        case 'total_amount':
          extractedData.totalAmount = entity.mentionText;
          break;
        case 'supplier_name':
          extractedData.supplierName = entity.mentionText;
          break;
        case 'invoice_date':
          extractedData.invoiceDate = entity.mentionText;
          break;
        case 'due_date':
          extractedData.dueDate = entity.mentionText;
          break;
        case 'invoice_id':
            extractedData.invoiceId = entity.mentionText;
            break;
      }
    }
    
    console.log('Extracted Data:', extractedData);
    return extractedData;

  } catch (error) {
    console.error('ERROR processing document:', error);
    throw new Error('Failed to process document with Document AI.');
  }
}

module.exports = { processInvoice };