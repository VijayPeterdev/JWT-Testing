const jwt = require('jsonwebtoken');

const generateAccessToken =  (user) => {

  return  jwt.sign({id:userData._id,isAdmin:userData.isAdmin},process.env.JWT_KEY,{expiresIn:"15m"});


}

module.exports = {
  generateAccessToken
}