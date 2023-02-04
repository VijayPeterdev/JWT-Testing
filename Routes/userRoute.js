const { Router } = require("express");
const {updateuser, deleteuser } = require("../Controllers/userController");
const { userAuth } = require("../verifyToken");


const route = require("express").Router();

// update user

route.put('/find/:id',  userAuth, updateuser);


//delete user

route.delete("/find/:id",userAuth,deleteuser);




module.exports = route;