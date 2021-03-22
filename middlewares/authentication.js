
const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try {
          //get current user profile
          const {authorization} = req.headers;
          //decoding the token to yield hash, and compare it with the hashed data
          const signedData = jwt.verify(authorization, process.env.SECRET);
          req.signedData = signedData;
          next();
        } 
        catch (err) {
          console.error(err);
          res.statusCode = 401;
          res.json({ success: false, message: "authorization failed" });
        }
  }