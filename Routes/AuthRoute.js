const { signin, signup } = require("../Controllers/userController");
const { userAuth } = require("../verifyToken");


const route = require("express").Router();

// Signin

route.post('/signin', signin);

//Signup
route.post('/signup', signup);





module.exports = route;