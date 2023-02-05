const RefreshTokenDB = require("../Models/RefreshToken");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../Token/generateToken");
const { generateRefreshToken } = require("../Token/refreshToken");
const RefreshToken = require("../Models/RefreshToken");

const RefreshTokenGenerate = async (req, res, data) => {
  //step 1 : take the Token from the user

  const refreshTokenClient = req.body.refreshtoken;

  

  // step 2 : check the token

  !refreshTokenClient &&  res.status(401).json("You are not Authenticated!");



 

  //  if(!checkingDBToken) return res.status(403).json("Refresh Token Not Valid!")

  jwt.verify(refreshTokenClient, process.env.JWT_Refresh_Token_Key, async(err, user) => {
    if (err) return res.status(401).json("Token is not Valid");

    
    if(user){
  
      try{
    
           
          const newAccessToken =  jwt.sign({id:user.id,isAdmin:user.isAdmin},process.env.JWT_KEY,{expiresIn:"5s"});
           
          const newRefreshToken =  jwt.sign({id:user.id,isAdmin:user.isAdmin},process.env.JWT_Refresh_Token_Key);

            // console.log("New AccessToken:" + newAccessToken);
            // console.log("New RefreshToken:" + newRefreshToken);


    const findToken = await RefreshTokenDB.findOne({refreshToken:refreshTokenClient})
   
 
    console.log(findToken);
    if(findToken){



       
    await RefreshToken.findOneAndDelete({refreshToken:refreshTokenClient});


      const newToken = await RefreshTokenDB({
        refreshToken : newRefreshToken,  
       })

       
       await newToken.save();

       
       res.status(200).json({
        accessToken:newAccessToken,
       refreshToken : newRefreshToken,
       })


    }else{

    !findToken && res.status(403).json("Token not list")




    }





  


      }catch(err){

        res.status(403).json(" ❕ Refresh Token Not Valid")
      }
    

       
      
        //  return res.status(201).json({});

    }else{

        return res.status(403).json({
            message : "user not authenticated!",
            err : err,
        })

    }

  });


  // step 3 : store the data into MongoDB

  // send error no token or invalid

  // if everything ok create accessToken ,refresh token send to user
};

module.exports = {
  RefreshTokenGenerate,
};
