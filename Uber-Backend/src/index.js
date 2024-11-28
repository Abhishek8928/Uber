require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const establishDatabaseConnection = require("./config/connection");
const UserModel = require("./Model/User");
const { validateLogInField ,validateSignInField } = require("./Utils.js/validate");
const cookieParser = require("cookie-parser");
const BlackListTokenModel = require('./Model/BlackListToken');

const { COOKIES_OPTION } = require("./Utils.js/constant");
const UserAuth = require("./Middleware/UserAuth");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.post("/auth/register", async (req, res, next) => {
  try {

    const { emailId, password , firstName , lastName } = req.body;

    if (!emailId || !password || !firstName || !lastName) {
      return res.status(400).json({
        error: "Missing credentials",
        message: "Both emailId and password are required."
      });
    }


    const ALLOWED_FIELD = [
      "firstName",
      "lastName",
      "emailId",
      "password",
    ];

    const BODY_FIELD = Object.keys(req.body); // return array with keys

    const sanitizeReqBody = BODY_FIELD.every((item) =>
      ALLOWED_FIELD.includes(item)
    );

    if (!sanitizeReqBody) {
      return res
        .status(400)
        .json({ error: "Invalid data", message: "Some fields are not allowed." });
    }

    const Validation_Check = validateLogInField(req);

    if (!Validation_Check) {
      return res
        .status(400)
        .json({ error: "Validation failed", message: "Input fields are invalid." });
    }

    const onBoardingNewUser = new UserModel({
      ...req.body,
    });

    const hashedPassword = await onBoardingNewUser.encryptPassword();

    onBoardingNewUser.set("password", hashedPassword);

    const token = await onBoardingNewUser.generateToken();

    await onBoardingNewUser.save();

    res.cookie("token", token, COOKIES_OPTION);

    res.status(200).json({
      message: "user created successfully",
      token,
      userId: onBoardingNewUser._id,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
});


app.post("/auth/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).json({
        error: "Missing credentials",
        message: "Both emailId and password are required."
      });
    }

    const ALLOWED_FIELD = ["emailId", "password"];
    const BODY_FIELD = Object.keys(req.body);
    const sanitizeReqBody = BODY_FIELD.every(item => ALLOWED_FIELD.includes(item));

    if (!sanitizeReqBody) {
      return res.status(400).json({
        error: "Invalid data", message: "Some fields are not allowed."
      });
    }

    const validationCheck = validateSignInField(req);
    if (!validationCheck) {
      return res.status(400).json({ error: "Validation failed", message: "Input fields are invalid." });
    }

    const existingUser = await UserModel.findOne({ emailId }).select('password');
    
    if (!existingUser) {
      return res.status(404).json({
        error: "User not found",
        message: "Invalid emailId or password."
      });
    }
    const isPasswordValid = await existingUser.verifyPassword(password ,existingUser?.password);

    if(!isPasswordValid){
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid emailId or password."
      });
    }
    const token = await existingUser.generateToken();

    res.cookie('token', token, COOKIES_OPTION);

    res.status(200).json({
      message: "Login successful",
      token,
      userId: existingUser?._id,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
});

app.get("/profile", UserAuth ,async (req,res)=>{
  try {
    const { _id } = req.user;
    const user = await UserModel.findById(_id);

    res.status(200).json({
      message: "Profile fetched successfully.",
      data: user
    });
  } catch (error) {
    res.status(400).json({ error: "Token verification failed", message: error.message });
  }
})



app.post("/logout", UserAuth, async (req, res) => {
  const {token} = req;
  await BlackListTokenModel.create({token})
  res.clearCookie('token');
  res.status(200).json({ message: "Logout successful" });
});

const PORT = process.env.PORT || 3000;

establishDatabaseConnection()
  .then(() => {
    console.log("Connected to db");
    app.listen(PORT, () => {
      console.log(`Server is now running on port ${PORT}...`);
    });
  })
  .catch((err) => console.log(err));
