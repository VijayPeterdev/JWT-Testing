const mongoose = require("mongoose");

const RefreshTokenSchema = mongoose.Schema(
  {
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("refreshToken",RefreshTokenSchema);
