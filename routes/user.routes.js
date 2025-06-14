//Creating independent routes
const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator') //For input validation
const bcrypt = require('bcrypt') //For hashing password
const jwt = require('jsonwebtoken') //To keep user authorised for rest of the session
const userModel = require('../models/user.model')

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register',
    body('username').trim().isLength({min: 3, max:15}),
    body('email').trim().isEmail().isLength({min: 10}),
    body('password').trim().isLength({min: 5}),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({
                error: errors.array(),
                message: "Invalid Input"
            })
        }

        const {username, email, password} = req.body

        const hashedPass = await bcrypt.hash(password, 10) //2nd arg is the number rounds to be hashed

        const user = await userModel.create({
            username: username,
            email: email,
            password: hashedPass
        })

        res.redirect('/user/login')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login',
    body('username').trim().isLength({min: 3, max: 15}),
    body('password').trim().isLength({min: 5}),
    async (req, res) => {
        const { username, password } = req.body
        const user = await userModel.findOne({
            username: username
        })

        if (!user) {
            return res.status(400).json({
                message: "Incorrect username or password"
            })
        }

        isAuthenticated = await bcrypt.compare(password, user.password)

        if (!isAuthenticated) {
            return res.status(400).json({
                message: "Incorrect username or password"
            })
        }

        const token = jwt.sign({
            userId: user._id,
            username: username,
            email: user.email
        }, process.env.JWT_SECRET)

        res.cookie('token', token)
        res.redirect('/home')
})

module.exports = router