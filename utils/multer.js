const multer = require('multer')
const firebaseStorage = require('multer-firebase-storage')
const firebase = require('./firebase')
const serviceAccount = require('../drive-28da5-firebase-adminsdk-fbsvc-972d77b40c.json')

const storage = firebaseStorage({
    credentials: firebase.credential.cert(serviceAccount),
    bucketName: 'drive-28da5.firebasestorage.app',
    unique:true,
})

const upload = multer({
    storage: storage,
})

module.exports = upload