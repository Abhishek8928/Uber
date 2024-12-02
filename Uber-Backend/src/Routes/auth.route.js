require("dotenv").config();
const express = require("express");
const {
  validateLogInField,
  validateSignUpField,
} = require("../Utils.js/validate");

const { COOKIES_OPTION } = require("../Utils.js/constant");


const UserModel = require("../Model/User");
const CaptainModel = require("../Model/Captain");
const router = express.Router();

router.post("/register/user", async (req, res, next) => {
  try {
    const { emailId, password, firstName, lastName } = req.body;

    if (!emailId || !password || !firstName || !lastName) {
      return res.status(400).json({
        error: "Missing credentials",
        message: "Both emailId and password are required.",
      });
    }

    const user = await UserModel.findOne({emailId});

    if(user){
      return res.status(400).json({
        error: "Account issue",
        message: "Please check your details and try again.",
      });
    }

    const ALLOWED_FIELD = ["firstName", "lastName", "emailId", "password"];

    const BODY_FIELD = Object.keys(req.body); // return array with keys

    const sanitizeReqBody = BODY_FIELD.every((item) =>
      ALLOWED_FIELD.includes(item)
    );

    if (!sanitizeReqBody) {
      return res.status(400).json({
        error: "Invalid data",
        message: "Some fields are not allowed.",
      });
    }

    const Validation_Check = validateSignUpField(req);

    if (!Validation_Check) {
      return res.status(400).json({
        error: "Validation failed",
        message: "Input fields are invalid.",
      });
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
      role:0
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
});

router.post("/login/user", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).json({
        error: "Missing credentials",
        message: "Both emailId and password are required.",
      });
    }

    const ALLOWED_FIELD = ["emailId", "password"];
    const BODY_FIELD = Object.keys(req.body);
    const sanitizeReqBody = BODY_FIELD.every((item) =>
      ALLOWED_FIELD.includes(item)
    );

    if (!sanitizeReqBody) {
      return res.status(400).json({
        error: "Invalid data",
        message: "Some fields are not allowed.",
      });
    }

    const validationCheck = validateLogInField(req);
    if (!validationCheck) {
      return res.status(400).json({
        error: "Validation failed",
        message: "Input fields are invalid.",
      });
    }

    const existingUser = await UserModel.findOne({ emailId }).select(
      "password"
    );

    if (!existingUser) {
      return res.status(404).json({
        error: "User not found",
        message: "Invalid emailId or password.",
      });
    }
    const isPasswordValid = await existingUser.verifyPassword(
      password,
      existingUser?.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid emailId or password.",
      });
    }
    const token = await existingUser.generateToken();

    res.cookie("token", token, COOKIES_OPTION);

    res.status(200).json({
      message: "Login successful",
      token,
      userId: existingUser?._id,
      role:0
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
});

router.post("/register/captain", async (req, res, next) => {
  try {
    const { emailId, password, firstName, lastName , vehicleInfo } = req.body;

    if (!emailId || !password || !firstName || !lastName ) {
      return res.status(400).json({
        error: "Missing credentials",
        message: "Both emailId and password are required.",
      });
    }

    const captainAlreadyExits = await CaptainModel.findOne({emailId});
    const userAlreadyExits = await UserModel.findOne({emailId});

    if(captainAlreadyExits || userAlreadyExits){
      return res.status(400).json({
        error: "Account issue",
        message: "Please check your details and try again.",
      });
    }

    const ALLOWED_FIELD = ["firstName", "lastName", "emailId", "password" ,"vehicleInfo"];

    const BODY_FIELD = Object.keys(req.body); // return array with keys

    const sanitizeReqBody = BODY_FIELD.every((item) =>
      ALLOWED_FIELD.includes(item)
    );

    if (!sanitizeReqBody) {
      return res.status(400).json({
        error: "Invalid data",
        message: "Some fields are not allowed.",
      });
    }

    const Validation_Check = validateSignUpField(req);

    if (!Validation_Check) {
      return res.status(400).json({
        error: "Validation failed",
        message: "Input fields are invalid.",
      });
    }

    const onBoardingNewCaptain = new CaptainModel({
      ...req.body,
    });

    const hashedPassword = await onBoardingNewCaptain.encryptPassword();

    onBoardingNewCaptain.set("password", hashedPassword);

    const token = await onBoardingNewCaptain.generateToken();

    await onBoardingNewCaptain.save();

    res.cookie("token", token, COOKIES_OPTION);

    res.status(200).json({
      message: "user created successfully",
      token,
      role:1,
      userId: onBoardingNewCaptain._id,

    });
  } catch (err) {
    res.status(500).json({ error: "Server error", message: err.message });
  }
});


router.post("/login/captain", async (req, res) => {
    try {
      const { emailId, password } = req.body;
  
      if (!emailId || !password) {
        return res.status(400).json({
          error: "Missing credentials",
          message: "Both emailId and password are required.",
        });
      }
  
      const ALLOWED_FIELD = ["emailId", "password"];
      const BODY_FIELD = Object.keys(req.body);
      const sanitizeReqBody = BODY_FIELD.every((item) =>
        ALLOWED_FIELD.includes(item)
      );
  
      if (!sanitizeReqBody) {
        return res.status(400).json({
          error: "Invalid data",
          message: "Some fields are not allowed.",
        });
      }
  
      const validationCheck = validateLogInField(req);
      if (!validationCheck) {
        return res.status(400).json({
          error: "Validation failed",
          message: "Input fields are invalid.",
        });
      }
  
      const existingCaptain = await CaptainModel.findOne({ emailId }).select(
        "password"
      );
  
      if (!existingCaptain) {
        return res.status(404).json({
          error: "User not found",
          message: "Invalid emailId or password.",
        });
      }
      const isPasswordValid = await existingCaptain.verifyPassword(
        password,
        existingCaptain?.password
      );
  
      if (!isPasswordValid) {
        return res.status(401).json({
          error: "Unauthorized",
          message: "Invalid emailId or password.",
        });
      }
      const token = await existingCaptain.generateToken();
  
      res.cookie("token", token, COOKIES_OPTION);
  
      res.status(200).json({
        message: "Login successful",
        token,
        userId: existingCaptain?._id,
        role:1
      });
    } catch (err) {
      res.status(500).json({ error: "Server error", message: err.message });
    }
  });


module.exports = router;
