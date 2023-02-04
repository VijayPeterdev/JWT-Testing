const jwt = require("jsonwebtoken");

// jwt verify method
const verifyToken = (req, res, next) => {
  const authToken = req.headers.token;

  if (authToken) {
    // Bearer hsdhdhdhdh ----> etha split pannurom space vachi

    const token = authToken.split(" ")[1];
    console.log(token);

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) return res.status(401).json("Token is not Valid");

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("Token not Found");
  }
};

// short method

const userAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log("userAuth ✔️verify");

    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
        console.log("❌")
      res.status(401).json("You are not Allowed ");
    }
  });
};

module.exports = { userAuth, verifyToken };
