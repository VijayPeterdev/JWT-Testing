const User = require("../Models/User");
const CryptoJS = require("crypto-js");

const jwt = require('jsonwebtoken');

const RefreshTokenDB = require("../Models/RefreshToken");



//signin user
const signin = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });

    !userData && res.status(401).json("User Not Found");

    const OriginalPassword = CryptoJS.AES.decrypt(
      userData.password,
      process.env.ENCRYPT_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (req.body.password === OriginalPassword) {

//accessToken Process // Access token Generate pannura place
    const accessToken =  jwt.sign({id:userData._id,isAdmin:userData.isAdmin},process.env.JWT_KEY,{expiresIn:"30s"});
    
    // refresh Token
    const refreshToken =  jwt.sign({id:userData._id,isAdmin:userData.isAdmin},process.env.JWT_Refresh_Token_Key);

   

     const StoreAccessToken = await RefreshTokenDB({
      refreshToken : refreshToken,

     })


     try{

       await StoreAccessToken.save();

     }catch(err){

      res.status(500).json(err);
     }
  


      const {password,...other} = userData._doc;

      res.status(200).json({...other,accessToken,refreshToken});

     




    } else {
      res.status(401).json("Password is wrong");
    }
  } catch (err) {
    console.log(err);
  }
};

//signup user

const signup = async (req, res) => {
  const encryptPass = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.ENCRYPT_KEY
  ).toString();

  try {
    const userInsert = await User({
      username: req.body.username,
      password: encryptPass,
      email: req.body.email,
    });

    const newUser = await userInsert.save();

    const { password, ...other } = newUser._doc;
    res.status(201).json(other);
  } catch (err) {
    console.log(err);
  }
};




// update user 

const updateuser =  async(req,res) => {



  console.log("updateuser ✔️verify");
  

    if(req.body.password){

    req.body.password =  CryptoJS.AES.encrypt(req.body.password,process.env.ENCRYPT_KEY).toString();

    }

    try {

const updateUser =  await User.findByIdAndUpdate(req.params.id, {
    $set: req.body,
},{new:true});


const {password,...update} = updateUser._doc;
res.status(201).json(update);

}catch(err){
    res.status(401).json("You are not allowed to update");
}


}



// delete user


const deleteuser = async (req,res) =>{

  try{

    console.log("🗑️ Delete")
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json("User Successfully Delete");
  }catch(err){
    res.status(403).json("You are not Delete")
  }
}




// logout  refresh token delete pannurom security perpose

const logout = async(req,res) => {

  try{

    const refreshToken = req.body.refreshToken;

    // delete the token 
     await RefreshTokenDB.findOneAndDelete({refreshToken:refreshToken})
    res.status(200).json("You logout Successfully");




  }catch(err){
    res.status(403).json({
      message : "Error",
      err
    })

  }



}

module.exports = {
  signin,
  signup,
  updateuser,
  deleteuser,
  logout
};
