require('dotenv').config();
const multer = require('multer')
const firebaseStorage = require('multer-firebase-storage')
const firebase = require('./firebase')
const serviceAccount = require('../drive-28da5-firebase-adminsdk-fbsvc-972d77b40c.json')

const storage = firebaseStorage({
    credentials: firebase.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    bucketName: process.env.FIREBASE_STORAGE_BUCKET,
    unique:true,
})

const upload = multer({
    storage: storage,
})

module.exports = upload