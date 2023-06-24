const express = require('express');
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient;
const port = 8000;

// Connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'your_database_name';




// Create Express app
const app = express();



// Set up multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Set static folder for serving HTML, CSS, and JavaScript files
app.use(express.static('public'));

// Define route for form submission
app.post('/upload', upload.single('photoInput'), async (req, res) => {
  // Get input values from request body
  const { placeNameInput, experienceInput } = req.body;
  const photoUrl = req.file.path; // path to the uploaded photo

  try {
    // Create a new MongoClient
    const client = new MongoClient(url);

    // Connect to the MongoDB server
    await client.connect();

    // Select the database
    const db = client.db(hideout);

    // Create a new collection (if necessary) or use an existing one
    const collection = db.collection('queries');

    // Create a document with user data
    const userData = {
      photoUrl,
      placeName: placeNameInput,
      experience: experienceInput
    };

    // Insert the document into the collection
    const result = await collection.insertOne(userData);

    // Log the inserted document ID
    console.log('User data saved with ID:', result.insertedId);

    res.sendStatus(200); // Send success response
  } catch (error) {
    console.error('Error saving user data:', error);
    res.sendStatus(500); // Send error response
  } finally {
    client.close(); // Close the MongoDB connection
  }
});

// Start the server
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});