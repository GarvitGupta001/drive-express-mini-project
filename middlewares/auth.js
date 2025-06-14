const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const {token} = req.cookies
    
    if(!token){
        res.status(401).json({
            message: "unauthorised"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        return next()
    } catch(error){
        res.status(401).json({
            error: error,
            message: "unauthorised"
        })
    }

}

module.exports = auth