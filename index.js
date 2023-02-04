const express = require("express");
const app = express();
const AuthRoute = require("./Routes/AuthRoute.js");
const UserRoute = require("./Routes/userRoute.js")
const mongoose = require("mongoose");
const dotenv = require('dotenv');


dotenv.config();


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

app.listen(8080, () => {
  console.log("Server Start Successfully");
});
