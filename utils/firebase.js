require('dotenv').config(); // load .env variables

const Firebase = require('firebase-admin');

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

module.exports = Firebase;