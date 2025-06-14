const express = require('express')
const userRouter = require('./routes/user.routes') //To make routes in separate files for better readability
const indexRouter = require('./routes/index.routes')
const dotenv = require('dotenv') //To setup environment variables in .env file
const cookieParser = require('cookie-parser') //To manage cookins(to pass token in cookies in our case)
const connectToDB = require('./utils/db')

dotenv.config()
connectToDB()
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))+

app.set('view engine', 'ejs')

//configuring route
app.use('/', indexRouter)
app.use('/user', userRouter)

app.get("/", (req,res) => {
    res.redirect("/user/register")
})

app.listen(3000, () => {
    console.log("server running at port: http://localhost:3000")
})