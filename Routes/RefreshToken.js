
const { RefreshTokenGenerate } = require("../Controllers/RefreshToken");
const { userAuth } = require("../verifyToken");


const route = require("express").Router();

// Signin

route.post('/refresh', RefreshTokenGenerate);







module.exports = route;