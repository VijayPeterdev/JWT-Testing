const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },

    password: {
      type: String,
      require: true,
    },
    isAdmin:{
        type : String,
        require:true,

    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
