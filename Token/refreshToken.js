const jwt = require('jsonwebtoken');

const generateRefreshToken =  (user) => {

   return jwt.sign({id:userData._id,isAdmin:userData.isAdmin},process.env.JWT_KEY,(err,user) => {

    


   });

}

module.exports = {
    generateRefreshToken
}