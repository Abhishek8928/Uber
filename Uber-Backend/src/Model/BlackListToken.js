const mongoose = require("mongoose");

const { isJWT } = require("validator");

const blackListSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      validate: {
        validator: function (value) {
          return isJWT(value);
        },
        message: "Invalid JWT token",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blackListToken", blackListSchema);
