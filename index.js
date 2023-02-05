const express = require("express");
const app = express();
const AuthRoute = require("./Routes/AuthRoute.js");
const UserRoute = require("./Routes/userRoute.js")
const RefreshTokenRoute = require("./Routes/RefreshToken.js")
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();
app.use(cors());



//Json Middleware

app.use(express.json());




// mongoDB Connection


mongoose.connect(process.env.MONGO_URL).then((connnect) => {
    console.log(" MongoDB Successfully Connected")
}).catch((err) => {
    console.log(err);
})





//Routes
app.use("/api", AuthRoute);
app.use("/api",UserRoute);

//Refresh Token Route
app.use("/api",RefreshTokenRoute);

app.listen(8080, () => {
  console.log("Server Start Successfully");
});
