require("dotenv").config();

const mongoose = require("mongoose");
const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [4, 'First name must be at least 4 characters.'],
      maxLength: [14, 'First name must be at most 14 characters.'],
      validate: {
        validator: value => /^[A-Za-z]+$/.test(value), 
        message: props => `${props.value} is not valid; only alphabetic characters are allowed.`,
      },
    },
    lastName: {
      type: String,
      required: true,
      minLength: [4, 'Last name must be at least 4 characters.'],
      maxLength: [14, 'Last name must be at most 14 characters.'],
      validate: {
        validator: value => /^[A-Za-z]+$/.test(value), 
        message: props => `${props.value} is not valid; only alphabetic characters are allowed.`,
      },
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: value => {
        if (!isEmail(value)) {
          throw new Error("Email is not valid.");
        }
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = function () {
  const userId = this._id;
  const token = jwt.sign(
    {
      userId,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  return token;
};

userSchema.methods.encryptPassword = async function () {
  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(this.password, saltRounds);

  return hashedPassword;
};

userSchema.methods.verifyPassword = async function (
  userInputPassword,
  storedPassword
) {

 
  const isValid = await bcrypt.compare(userInputPassword, storedPassword);

  return isValid;
};

module.exports = mongoose.model("User", userSchema);
