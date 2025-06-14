const Firebase = require('firebase-admin')
const serviceAccount = require('../drive-28da5-firebase-adminsdk-fbsvc-972d77b40c.json')

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: 'drive-28da5.firebasestorage.app'
})

module.exports = Firebase