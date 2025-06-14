const mongoose = require('mongoose')

const connectToDB = async ()=>{
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to databse")
    })
}

module.exports = connectToDB