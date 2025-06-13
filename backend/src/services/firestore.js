/*
================================================================================
| FILE: backend/src/services/firestore.js                                      |
|                                                                              |
| This file contains functions for interacting with the Firestore database.    |
| It handles saving the extracted document data under the correct user.        |
================================================================================
*/

// Import the Google Cloud Firestore client library
const { Firestore } = require('@google-cloud/firestore');

// Initialize the Firestore client
const db = new Firestore();

/**
 * Saves the extracted document data to Firestore.
 * @param {string} userId The ID of the user who uploaded the document.
 * @param {object} data The extracted data object from the AI service.
 * @param {string} fileName The original name of the uploaded file.
 * @returns {Promise<string>} A promise that resolves to the ID of the new Firestore document.
 */
async function saveDocumentData(userId, data, fileName) {
  if (!userId || !data) {
    throw new Error('User ID and data are required to save to Firestore.');
  }

  try {
    // Define the data to be saved.
    const documentToSave = {
      ...data, // Spread the extracted data (e.g., totalAmount, supplierName)
      originalFileName: fileName,
      processedAt: Firestore.FieldValue.serverTimestamp(), // Add a server timestamp
      userId: userId, // Link the document to the user
    };

    // Add the data to a 'documents' sub-collection within a specific user's document.
    // This is a common and secure pattern for storing user-specific data.
    const docRef = await db.collection('users').doc(userId).collection('documents').add(documentToSave);

    console.log(`Successfully saved document data with ID: ${docRef.id}`);
    return docRef.id;

  } catch (error) {
    console.error('ERROR saving to Firestore:', error);
    throw new Error('Could not save document data to Firestore.');
  }
}

module.exports = { saveDocumentData };
