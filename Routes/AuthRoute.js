const { Router } = require("express");
const { signin, signup ,logout } = require("../Controllers/userController");
const { userAuth } = require("../verifyToken");


const route = require("express").Router();

// Signin

route.post('/signin', signin);

//Signup
route.post('/signup', signup);

//logout

route.delete("/logout/:id", userAuth, logout);





module.exports = route;