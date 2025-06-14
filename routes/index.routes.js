const express = require('express')
const router = express.Router()
const upload = require('../utils/multer')
const firebase = require('../utils/firebase') //for accessing files in firebase
const authorise = require('../middlewares/auth')
const fileModel = require('../models/files.model')

router.get('/home', authorise, async (req, res) => {
    const userFiles = await fileModel.find({
        userId: req.user.userId
    })

    console.log(userFiles)

    res.render('home', {
        files: userFiles
    })
})

router.post('/upload', authorise, upload.single('file'), async (req, res) => {
    const file = await fileModel.create({
        originalName: req.file?.originalname,
        path: req.file.path,
        size: req.file.fileRef.metadata.size,
        userId: req.user.userId
    })

    console.log(file)

    res.redirect('/home')
})

router.get('/download/:path', authorise, async (req, res) => {
    const {path} = req.params
    const {userId} = req.user
    
    const file = await fileModel.findOne({
        path: path,
        userId: userId,
    })

    if(!file){
        res.status(401).json({
            message: "unauthorised"
        })
    }

    //by default firebase doesn't give access to files we need to make a singned url wich is valid for a short amount of time
    const signedURL = await firebase.storage().bucket().file(path).getSignedUrl({
        action: 'read',
        expires: Date.now() + 60*1000,
    })

    res.redirect(signedURL[0])
})

module.exports = router